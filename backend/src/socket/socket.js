import Message from "../models/Message.js";

/* Store users per room */

let users = {};

export const setupSocket = (io) => {

  io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

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

        /* Send updated users list */

        const roomUsers =
          Object.values(users)
            .filter(
              user => user.room === room
            )
            .map(
              user => user.username
            );

        io.to(room).emit(
          "usersList",
          roomUsers
        );

        /* Load previous messages */

        const messages =
          await Message.find({ room });

        socket.emit(
          "previousMessages",
          messages
        );

        /* Notify join */

        io.to(room).emit(
          "systemMessage",
          `${username} joined`
        );

      }
    );

    /* SEND MESSAGE */

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

        const user =
          users[socket.id];

        if (user) {

          delete users[socket.id];

          const roomUsers =
            Object.values(users)
              .filter(
                u => u.room === user.room
              )
              .map(
                u => u.username
              );

          io.to(user.room).emit(
            "usersList",
            roomUsers
          );

          io.to(user.room).emit(
            "systemMessage",
            `${user.username} left`
          );

        }

        console.log(
          "User Disconnected:",
          socket.id
        );

      }
    );

  });

};