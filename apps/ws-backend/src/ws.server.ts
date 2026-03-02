import dotenv from "dotenv";
dotenv.config();
import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { userManager } from "./manager/user.manager";
import { roomManager } from "./manager/room.manager";


const wss = new WebSocketServer({ port: 8080 });

console.log("DB URL:", process.env.DATABASE_URL);

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD!);

    console.log(decoded);

    if (typeof decoded === "string") return null;

    const payload = decoded as { id: string };
    return payload.id ?? null;

  } catch (err) {
    console.log("JWT ERROR:", err);
    return null;
  }
}

wss.on("connection", (ws, request) => {
  console.log("NEW CONNECTION");

  ws.on("error", (err) => {
    console.log("WS ERROR:", err);
  });

  const fullUrl = new URL(request.url!, "http://localhost:8080");
  const token = fullUrl.searchParams.get("token") || "";

  const userId = checkUser(token);
  // const userId = "test_user";
  console.log("USER ID:", userId);

  if (!userId) {
    ws.close(4001, "Unauthorized");
    return;
  }

  userManager.addUser({
    userId,
    rooms: [],
    ws
  });

  ws.on("message", async (data) => {
    try {
      const parseData = JSON.parse(data.toString());

      switch (parseData.type) {
        case "join_room":
          roomManager.joinRoom(ws, parseData.roomId);
          break;

        case "leave_room":
          roomManager.leaveRoom(ws, parseData.roomId);
          break;

        case "chat":
          roomManager.sendMessage(parseData.roomId, parseData.message, userId);
          break;
      }

    } catch (err) {
      console.log("MESSAGE ERROR:", err);
      ws.send(JSON.stringify({ type: "error", message: "Invalid format" }));
    }
  });

  ws.on("close", () => {
    userManager.removeUser(ws);
  });

  ws.send(JSON.stringify({ type: "connected" }));
});