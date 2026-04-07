import { WebSocketServer } from "ws";

let clients = [];

export const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  console.log("WebSocket Server Started");

  wss.on("connection", (ws) => {
    console.log("New Client Connected");

    let username = "";

    ws.on("message", (data) => {
      const message = JSON.parse(data);

      if (message.type === "join") {
        username = message.username;

        clients.push({
          ws,
          username
        });

        broadcast({
          type: "system",
          text: `${username} joined the chat`,
          time: new Date()
        });

        return;
      }

      if (message.type === "chat") {
        broadcast({
          type: "chat",
          username,
          text: message.text,
          time: new Date()
        });
      }
    });

    ws.on("close", () => {
      clients = clients.filter(client => client.ws !== ws);

      broadcast({
        type: "system",
        text: `${username} left the chat`,
        time: new Date()
      });

      console.log("Client Disconnected");
    });
  });
};

function broadcast(message) {
  clients.forEach(client => {
    client.ws.send(JSON.stringify(message));
  });
}