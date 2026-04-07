import mongoose from "mongoose";

const messageSchema =
  new mongoose.Schema({

    sender: {
      type: String,
      required: true
    },

    text: String,

    file: String,

    room: String,

    receiver: String,

    isPrivate: {
      type: Boolean,
      default: false
    },

    time: {
      type: Date,
      default: Date.now
    }

  });

export default mongoose.model(
  "Message",
  messageSchema
);