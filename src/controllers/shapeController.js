const shapeModel = require('../db/models/shape.model');


async function createShape(req,res)
{
    const id = req.user._id;

    const shape = await shapeModel.create({
        ...req.body,

        createdBy: id
    });

    res.status(201).json({
        message: "Shape created succesfully",
        shape
    })
}

async function getShape(req,res)
{
    const boardId = req.params.boardId;

    const shape = await shapeModel.find({
        boardId:boardId
    })

    if(!shape)
    {
        return res.status(404).json({
            message: "No shape found"
        })
    }

    res.status(200).json({
        messgae: "Shapes found successfully",
        shape
    });
}







module.exports = {
    createShape,

}