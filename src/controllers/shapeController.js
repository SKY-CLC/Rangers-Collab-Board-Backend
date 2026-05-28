const { request } = require('express');
const shapeModel = require('../db/models/shape.model');


async function createShape(req,res)
{
    const io = req.app.get("io");
    const id = req.user._id;
    const { boardId, type, shapeData } = req.body;

    const shape = await shapeModel.create({
        boardId,
        createdBy: id,
        type,
        shapeData
    });

    io.to(boardId).emit("create-shape",{
        shape
    });

    res.status(201).json({
        message: "Shape created succesfully",
        shape
    })
}

async function getShape(req,res)
{
    const boardId = req.params.boardId;

    const shapes = await shapeModel.find({
        boardId
    })

    res.status(200).json({
        message: "Shapes found successfully",
        shapes
    });
}


async function updateShape(req,res)
{
    const io = req.app.get("io");
    const shapeId = req.params.shapeId;
    const { shapeData } = req.body;

    const shape = await shapeModel.findByIdAndUpdate(
         shapeId,
        {
        shapeData
    },{ new : true, runValidators: true })

    if(!shape)
    {
        return res.status(404).json({
            message: "No shape found",
        })
    }

    io.to(shape.boardId.toString()).emit("update-shape",{
        shape
    });

    res.status(200).json({
        message: "Shape updated successfully",
        shape
    })
       
}


async function deleteShape(req,res)
{
    
    const io = req.app.get("io");

    const shapeId = req.params.shapeId;

    const shape = await shapeModel.findOneAndDelete({
        _id: shapeId
    })

    if(!shape)
    {
        return res.status(404).json({
            message: "Shape not found"
        })
    }
    
    io.to(shape.boardId.toString()).emit("delete-shape",{
        shapeId
    });
     
    res.status(200).json({
        message: "Shape deleted successfully"
    })
}


module.exports = {
    createShape,
    getShape,
    updateShape,
    deleteShape
}