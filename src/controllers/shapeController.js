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