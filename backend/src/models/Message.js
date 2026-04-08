import mongoose from "mongoose";

const messageSchema =
new mongoose.Schema({

  sender: {
    type: String,
    required: true
  },

  receiver: String,

  text: String,

  room: String,

  isPrivate: {
    type: Boolean,
    default: false
  },

  /* WhatsApp-style status */

  status: {
    type: String,
    enum: [
      "sent",
      "delivered",
      "seen"
    ],
    default: "sent"
  }

}, {

  timestamps: true

});

export default mongoose.model(
  "Message",
  messageSchema
);