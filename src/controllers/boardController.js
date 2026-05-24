const boardModel = require('../db/models/board.model');


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


module.exports = {
    createBoard
}