const cardModel = require('../db/models/card.model');
const { uploadFile, deleteFile } = require('../service/storage.service');
const { v4: uuidv4 } = require('uuid');

async function createCard(req,res){

   const io = req.app.get("io");

  const { title, description, boardId, status, labels } = req.body
  const {_id} = req.user;

  const card = await cardModel.create({
    title: title,
    description: description,
    boardId: boardId,
    status: status,
    createdBy: _id,
    labels: labels
  })


  io.to(boardId).emit("create-card",{
    card
  });

  res.status(201).json({
    message: "Card created successfully",
    card:card
  });
}

async function getAllCards(req,res)
{
  const  boardId  = req.params.boardId;
  const cards = await cardModel.find({
    boardId
  });

  if(!cards)
  {
    return res.status(404).json({
      message: "No card found"
    })
  }

  res.status(200).json({
    message: "Cards fetched successfully",
    cards: cards
  })
}

async function getSingleCard(req,res){
  const cardId = req.params.cardId;

  const card = await cardModel.findById(cardId);

  if(!card)
  {
    return res.status(404).json({
      message: "Card not found"
    })
  }

  res.status(200).json({
    message: "Card fetched successfully",
    card: card
  })
  
}

async function updateCard(req,res)
{
   const io = req.app.get("io"); 

  const cardId = req.params.cardId;
  const updateFields = req.body;

  const card = await cardModel.findByIdAndUpdate(
    cardId,
    updateFields,
    {new:true}
  );

  if(!card)
  {
    return res.status(404).json({
      message: "Card not found"
    })
  }

  io.to(card.boardId.toString()).emit("update-card",{
    card
  });

  res.status(200).json({
    message: "Card updated successfully",
    updateFields: updateFields
  });
}

async function deleteCard(req,res)
{

  const io = req.app.get("io");

  const cardId = req.params.cardId;
  const {_id} = req.user;

  const card = await cardModel.findByIdAndDelete(cardId);

  if(!card)
  {
    return res.status(404).json({
      message: "Card not found"
    });
  }

  io.to(card.boardId.toString()).emit("delete-card",{
    cardId
  });

  res.status(200).json({
    message: "Card deleted successfully"
  });

  
}

async function addAttachment(req,res)
{
  const io = req.app.get("io");
  
  const file = req.file;
  const cardId = req.params.cardId;

  const card = await cardModel.findById(cardId);

  if(!card)
  {
    return res.status(404).json({
    message: "Card not found"
    })
  }

  if(!file)
  {
    return res.status(400).json({
        message: "File is required"
    });
  }
  
  const result = await uploadFile(file.buffer,`${uuidv4()}`);

  const attachmentData  = {
   fileId: result.fileId,
   name: result.name,
   url: result.url
  }

  card.attachment = attachmentData;
  await card.save();

   io.to(card.boardId.toString()).emit("attachment-added",{
    cardId: card._id,
    attachment: card.attachment
   })

  res.status(200).json({
    message: "Attachment added successfully",
    result
  })
}


async function deleteAttachment(req,res)
{
      const io = req.app.get("io");

      const cardId = req.params.cardId;

      const card = await cardModel.findById(cardId);

      if(!card || !card.attachment)
      {
        return res.status(404).json({
          message: "Attachment not found"
        })
      }
      
      const fileId = card.attachment.fileId;

      await deleteFile(fileId);

      card.attachment = null;
      await card.save();

      io.to(card.boardId.toString()).emit("attachment-deleted",{
      cardId: card._id
      });

      res.status(200).json({
        message: "Attachment deleted successfully"
      })
}




module.exports = {
  createCard,
  getAllCards,
  getSingleCard,
  updateCard,
  deleteCard,
  addAttachment,
  deleteAttachment
}