import Message from "../models/Message.js";

let users = {};

export const setupSocket =
(io) => {

  io.on("connection",
  (socket) => {

    console.log(
      "User Connected:",
      socket.id
    );

    /* JOIN ROOM */

    socket.on(
      "joinRoom",
      async ({ username, room }) => {

        socket.join(room);

        /* Save user */

        users[socket.id] = {
          username,
          room
        };

        /* 🔥 SEND GLOBAL USERS */

        const allUsers =
          Object.values(users)
            .map(u => u.username);

        io.emit(
          "usersList",
          allUsers
        );

        /* Load Messages */

        const messages =
          await Message.find({
            room,
            isPrivate: false
          });

        socket.emit(
          "previousMessages",
          messages
        );

      }
    );

    /* PRIVATE MESSAGE */

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
            isPrivate: true

          });

        io.emit(
          "privateMessage",
          message
        );

      }
    );

    /* GROUP MESSAGE */

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
            room

          });

        io.to(room).emit(
          "message",
          message
        );

      }
    );

    /* TYPING */

    socket.on(
      "typing",
      ({ username, room }) => {

        socket.to(room).emit(
          "typing",
          username
        );

      }
    );

    /* DISCONNECT */

    socket.on(
      "disconnect",
      () => {

        delete users[socket.id];

        const allUsers =
          Object.values(users)
            .map(u => u.username);

        io.emit(
          "usersList",
          allUsers
        );

      }
    );

  });

};