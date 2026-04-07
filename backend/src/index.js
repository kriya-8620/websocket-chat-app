import express from "express";
import cors from "cors";
import http from "http";
import { setupWebSocket } from "./websocket.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("WebSocket Chat Server Running 🚀");
});

// Create HTTP server
const server = http.createServer(app);

// Setup WebSocket
setupWebSocket(server);

const PORT = 5000;

// Start Server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});