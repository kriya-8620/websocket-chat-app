import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

import { Server }
from "socket.io";

import { setupSocket }
from "./socket/socket.js";

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

/* Routes */

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