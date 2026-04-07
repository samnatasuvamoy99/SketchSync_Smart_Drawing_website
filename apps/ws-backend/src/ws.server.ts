import dotenv from "dotenv";
dotenv.config();
import { WebSocketServer } from "ws";

import { userManager } from "./manager/user.manager";
import { roomManager } from "./manager/room.manager";
//import cookie from "cookie";
import { checkUser } from "./validation/checkuser";


const wss = new WebSocketServer({ port: 8080 });

console.log("DB URL:", process.env.DATABASE_URL);



wss.on("connection", (ws, request) => {
  console.log("NEW CONNECTION");

  ws.on("error", (err) => {
    console.log("WS ERROR:", err);
  });

  const fullUrl = new URL(request.url!, "http://localhost:8080");
     
  console.log(fullUrl);
  
  const token = fullUrl.searchParams.get("token") || "";

  //   const cookies = cookie.parse(request.headers.cookie || "");
  // const token = cookies.token;

  console.log("Token:", token); //  debug

  if (!token) {
    ws.close();
    return;
  }

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