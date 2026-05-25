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

async function updateText(req, res)
{
    const textId = req.params.textId;

    const { text, x, y, color, fontSize } = req.body;

    const updateFields = {};

    if(text !== undefined)
    {
        updateFields.text = text;
    }

    if(x !== undefined)
    {
        updateFields.x = x;
    }

    if(y !== undefined)
    {
        updateFields.y = y;
    }

    if(color !== undefined)
    {
        updateFields.color = color;
    }

    if(fontSize !== undefined)
    {
        updateFields.fontSize = fontSize;
    }

    const updatedText = await textModel.findByIdAndUpdate(
        textId,
        updateFields,
        { new: true, runValidators: true });

    if(!updatedText)
    {
        return res.status(404).json({
            message: "Text not found"
        });
    }

    res.status(200).json({
        message: "Text updated successfully",
        text: updatedText
    });
}



module.exports = {
      createText,
      getTexts,
      updateText,

}