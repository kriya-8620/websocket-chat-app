import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

/* ============================= */
/* PRIVATE CHAT HISTORY */
/* ============================= */

router.get(
"/private/:user1/:user2",
async (req, res) => {

  try {

    const { user1, user2 } =
      req.params;

    const messages =
      await Message.find({

        isPrivate: true,

        $or: [

          {
            sender: user1,
            receiver: user2
          },

          {
            sender: user2,
            receiver: user1
          }

        ]

      }).sort({
        createdAt: 1
      });

    res.json(messages);

  } catch (err) {

    console.error(
      "Private history error:",
      err
    );

    res.status(500).json({
      error: "Failed to load messages"
    });

  }

});

export default router;