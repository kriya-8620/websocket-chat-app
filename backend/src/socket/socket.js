import Message from "../models/Message.js";
import User from "../models/User.js";

let users = {};

export const setupSocket =
(io) => {

  io.on("connection",
  (socket) => {

    console.log(
      "User Connected:",
      socket.id
    );

    /* ---------------------- */
    /* JOIN ROOM */
    /* ---------------------- */

    socket.on(
      "joinRoom",
      async ({ username, room }) => {

        socket.join(room);

        users[socket.id] = {
          username,
          room
        };

        /* SEND ONLINE USERS */

        const onlineUsers =
          Object.values(users)
            .map(u => u.username);

        io.emit(
          "usersList",
          onlineUsers
        );

        /* LOAD GROUP HISTORY */

        const messages =
          await Message.find({
            room,
            isPrivate: false
          }).sort({
            createdAt: 1
          });

        socket.emit(
          "previousMessages",
          messages
        );

      }
    );

    /* ---------------------- */
    /* GROUP MESSAGE */
    /* ---------------------- */

    socket.on(
      "chatMessage",
      async ({
        username,
        text,
        room
      }) => {

        const message =
          await Message.create({

            sender: username,
            text,
            room,
            isPrivate: false

          });

        io.to(room).emit(
          "message",
          message
        );

      }
    );

    /* ---------------------- */
    /* PRIVATE MESSAGE */
    /* ---------------------- */

    socket.on(
      "privateMessage",
      async ({
        sender,
        receiver,
        text
      }) => {

        const message =
          await Message.create({

            sender,
            receiver,
            text,
            isPrivate: true,
            status: "delivered"

          });

        io.emit(
          "privateMessage",
          message
        );

      }
    );

    /* ---------------------- */
    /* SEEN MESSAGE */
    /* ---------------------- */

    socket.on(
      "seenMessage",
      async (messageId) => {

        const updated =
          await Message
            .findByIdAndUpdate(
              messageId,
              { status: "seen" },
              { new: true }
            );

        if (updated) {

          io.emit(
            "messageSeen",
            updated
          );

        }

      }
    );

    /* ---------------------- */
    /* DISCONNECT */
    /* ---------------------- */

    socket.on(
      "disconnect",
      async () => {

        const user =
          users[socket.id];

        if (user) {

          await User.updateOne(
            { username: user.username },
            { lastSeen: new Date() }
          );

        }

        delete users[socket.id];

        const onlineUsers =
          Object.values(users)
            .map(u => u.username);

        io.emit(
          "usersList",
          onlineUsers
        );

        console.log(
          "User disconnected:",
          socket.id
        );

      }
    );

  });

};