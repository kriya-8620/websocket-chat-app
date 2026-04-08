import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import messageRoutes
from "./routes/messageRoutes.js";


import { Server }
from "socket.io";

import { setupSocket }
from "./socket/socket.js";
import userRoutes
from "./routes/userRoutes.js";
import conversationRoutes
from "./routes/conversationRoutes.js";



dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

/* Static file access */

app.use(
  "/uploads",
  express.static("uploads")
);


app.use(
  "/api/conversations",
  conversationRoutes
);

app.use(
  "/api/messages",
  messageRoutes
);
/* Routes */
app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/rooms",
  roomRoutes
);

/* Server */

const server =
  http.createServer(app);

const io =
  new Server(server, {

    cors: {
      origin: "*"
    }

  });

setupSocket(io);

server.listen(
  process.env.PORT,
  () => {

    console.log(
      "Server Running 🚀"
    );

  }
);