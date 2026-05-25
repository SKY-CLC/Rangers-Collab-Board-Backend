const textModel = require('../db/models/text.model');

async function createText(req, res)
{
    const userId = req.user._id;

    const { boardId, text, x, y, color, fontSize } = req.body;

    const text = await textModel.create({
        boardId,
        createdBy: userId,
        text,
        x,
        y,
        color,
        fontSize
    });

    res.status(201).json({
        message: "Text created successfully",
        text: text
    });
}

module.exports = {
      createText
}