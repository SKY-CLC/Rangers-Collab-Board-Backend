const cardModel = require('../db/models/card.model');

async function searchCard(req,res)
{
       const query = req.query.query;

       if(!query || query.trim() === "")
       {
        return res.status(400).json({
            message: "Search query is required"
        })
       }


       const cards = await cardModel.aggregate([
        
        {
          $search: {
              index: "cardSearch",

              text: {
                query: query,

                path: [
                    "description",
                    "status",
                    "labels.text"
                ],

                fuzzy: {}
              }
          }
        }

        ]);


       if(cards.length === 0)
       {
             return res.status(404).json({
                message: "Card not found"
             })
       }


      res.status(200).json({
        message: "Cards found successfully",
        cards
      });

}


module.exports = searchCard;