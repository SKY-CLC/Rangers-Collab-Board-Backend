const cardModel = require('../db/models/card.model');

async function createCard(req,res){
  const { title, description, boardId, status, labels: {text,color} } = req.body
  const {_id} = req.user;

  const card = await cardModel.create({
    title: title,
    description: description,
    boardId: boardId,
    status: status,
    createdBy: _id,
    labels: [
      {
        text: text,
        color: color
      }
    ]
  })

  res.status(201).json({
    message: "Card created successfully",
    card:{
      id: card._id,
      title: card.title,
      status: card.status
    }
  });
}

async function getAllCards(req,res)
{
  const  boardId  = req.params.boardId;
  const cards = await cardModel.find({
    boardId
  }).select("_id title status");

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
    message: "Card fetched successfully",,
    card: card
  })
  
}



module.exports = {
  createCard,
  getAllCards,
  getSingleCard
}