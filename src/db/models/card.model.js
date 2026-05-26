const mongoose = require('mongoose');

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
         "Mission Completed"
      ],

      default: "Planning"
   },

   labels: [
      {
         text: String,
         color: String
      }
   ],

   attachment: 
      {
         fileId: String,
         name: String,
         url: String
      }
   

}, { timestamps: true });

const cardModel = mongoose.model("card",CardSchema);

module.exports = cardModel;