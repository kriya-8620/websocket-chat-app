import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import { Server } from "socket.io";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { setupSocket }
  from "./socket/socket.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",
  authRoutes
);

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