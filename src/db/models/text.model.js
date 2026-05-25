const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
 
    boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board"
   },

   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },

   text: {
      type: String,
      required: true
   },

   x: Number,

   y: Number,

   color: String,

   fontSize: Number

},{ timestamps: true });

const textModel = mongoose.model("text",textSchema);

module.exports = textModel;