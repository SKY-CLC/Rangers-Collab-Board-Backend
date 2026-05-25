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

module.exports = {
  createCard,
}