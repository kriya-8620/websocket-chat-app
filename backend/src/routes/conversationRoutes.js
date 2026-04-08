import express from "express";
import Message from "../models/Message.js";
import User from "../models/User.js";

const router = express.Router();

/* ========================= */
/* GET CONVERSATIONS */
/* ========================= */

router.get(
"/:username",
async (req, res) => {

  try {

    const { username } =
      req.params;

    /* Get all private messages */

    const messages =
      await Message.find({

        isPrivate: true,

        $or: [

          { sender: username },
          { receiver: username }

        ]

      }).sort({
        createdAt: -1
      });

    /* Create conversation map */

    const conversations =
      {};

    messages.forEach(msg => {

      const otherUser =
        msg.sender === username
          ? msg.receiver
          : msg.sender;

      if (!conversations[otherUser]) {

        conversations[otherUser] = msg;

      }

    });

    /* Get ALL users */

    const users =
      await User.find()
        .select("username lastSeen");

    /* Merge users + conversations */

    const result =
      users
        .filter(
          user =>
            user.username !== username
        )
        .map(user => {

          const lastMsg =
            conversations[
              user.username
            ];

          return {

            username:
              user.username,

            lastMessage:
              lastMsg
                ? lastMsg.text
                : "Start a conversation",

            time:
              lastMsg
                ? lastMsg.createdAt
                : null,

            lastSeen:
              user.lastSeen

          };

        });

    res.json(result);

  }

  catch (err) {

    console.error(err);

    res.status(500).json({
      error:
        "Conversation load failed"
    });

  }

});

export default router;