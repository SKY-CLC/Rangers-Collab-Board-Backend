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

async function getTexts(req, res)
{
    const boardId = req.params.boardId;

    const texts = await textModel.find({
        boardId
    });

    res.status(200).json({
        message: "Texts fetched successfully",
        texts
    });
}



module.exports = {
      createText,
      getTexts,
      
}