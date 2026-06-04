const cardModel = require('../db/models/card.model');

async function getBoardAnalytics(req,res)
{
     const boardId = req.params.boardId;

     const totalTasks = await cardModel.countDocuments({
        boardId
     });

     const planningTasks = await cardModel.countDocuments({
        boardId,
        status: "Planning"
     });

      const inProgressTasks = await cardModel.countDocuments({
        boardId,
        status: "In Progress"
    });

    const completedTasks = await cardModel.countDocuments({
        boardId,
        status: "Mission Completed"
    });

    res.status(200).json({
        totalTasks,
        planningTasks,
        inProgressTasks,
        completedTasks
    });
}


module.exports = {
    getBoardAnalytics
}