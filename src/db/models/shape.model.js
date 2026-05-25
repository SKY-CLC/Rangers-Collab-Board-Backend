const mongoose = require('mongoose');

const shapeSchema = new mongoose.Schema({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,      ref: "board"
  },
  createdBy: {
      type:mongoose.Schema.Types.ObjectId,
      ref: "User"
   },
  type: {
    type: String,
    enum: [
      "rectangle", 
      "circle", 
      "line", 
      "arrow"
    ]
  },

  x: Number,
  y: Number,

  width: Number,
  height: Number,

  radius: Number,

  startX: Number,
  startY: Number,

  endX: Number,
  endY: Number,

  color: String,
  
},{ timestamps: true });

const shapeModel = mongoose.model("shape",shapeSchema);

module.exports = shapeModel;