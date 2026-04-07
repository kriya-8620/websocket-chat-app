import mongoose from "mongoose";

const roomSchema =
  new mongoose.Schema({

    name: {
      type: String,
      required: true,
      unique: true
    },

    users: [String]

  });

export default mongoose.model(
  "Room",
  roomSchema
);