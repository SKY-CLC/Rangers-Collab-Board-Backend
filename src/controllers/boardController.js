const boardModel = require('../db/models/board.model');
const userModel = require('../db/models/user.model');


async function createBoard(req,res)
{
    const { title } = req.body;
    const user  = req.user;

    const board = await boardModel.create({
        title: title,
        createdBy: user._id,
        members: [
            user._id
        ]
    });

    res.status(201).json({
        message: "Board created successfully",
        board: {
            id: board._id,
            title: board.title,
            createdBy: board.createdBy
        }

    })
}

async function getAllBoards(req,res)
{
    const { _id } = req.user;

    const boards = await boardModel.find({
         members: _id
    }).select("_id title");

    res.status(200).json({
        message: "Boards fetched successfully",
        boards: boards
    })
}


async function renameBoard(req,res)
{
    const id = req.params.boardId;
    const { title } = req.body;

    const board = await boardModel.findOneAndUpdate({
        _id:id
    },{
        title:title
    },{new:true});

    res.status(200).json({
        message: "Board title updated successfully",
        board: {
            id:board._id,
            title:board.title
        }
    })
    
}


async function deleteBoard(req,res)
{
      const id = req.params.boardId;

      await boardModel.findOneAndDelete({
        _id: id
      });

      res.status(200).json({
        message: "Board deleted successfully"
      })
}


module.exports = {
    createBoard,
    getAllBoards,
    renameBoard,
    deleteBoard
}