const mongoose = require('mongoos');

const CardSchema = new mongoose.Schema({

   title: {
      type: String,
      required: true
   },

   description: {
      type: String
   },

   boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board"
   },

   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
   },

   status: {
      type: String,

      enum: [
         "Planning",
         "In Progress",
         "Mission Complete"
      ],

      default: "Planning"
   },

   labels: [
      {
         text: String,
         color: String
      }
   ],

   attachments: [
      {
         url: String,
         public_id: String
      }
   ]

}, { timestamps: true });

const cardModel = mongoose.model("card",CardSchema);

module.exports = cardModel;