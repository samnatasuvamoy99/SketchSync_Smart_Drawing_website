import { WebSocket } from "ws";
import { userManager } from "./user.manager";
import {prisma} from "@repo/db/client"

class RoomManager {

  //joinRoom logic...
  async joinRoom(ws: WebSocket, roomId: string) {

    console.log("ooooo nooo",roomId);

  const user = userManager.getUser(ws);
  if (!user) return;

  const room = await prisma.room.findUnique({
    where: { id: roomId }
  });

  if (!room) {
    ws.send(JSON.stringify({ type: "error", message: "Room does not exist" }));
    return;
  }

  if (!user.rooms.includes(roomId)) {
    user.rooms.push(roomId);
  }

  ws.send(JSON.stringify({ type: "joined", roomId }));
}

  //leaveRoom_logic....
  leaveRoom(ws: WebSocket, roomId: string) {
  const user = userManager.getUser(ws);
  if (!user) return;

  if (!user.rooms.includes(roomId)) {
    console.log("User not in that room");
    return;
  }

  user.rooms = user.rooms.filter(room => room !== roomId);

  console.log(`User ${user.userId} left room ${roomId}`);
}


  // store message in db 
async saveMessage(roomId: string, message: string, userId: string) {

  const room = await prisma.room.findUnique({
    where: { id: roomId }
  });

  if (!room) {
    throw new Error(`Room ${roomId} does not exist`);
  }

  await prisma.chat.create({
    data: {
      message,
      roomId: roomId,
      userId: userId
    }
  });

  console.log("database pushed the message");
}

// sendMessage logic
async sendMessage(roomId: string, message: string, userId: string) {
  try {
    console.log("Sending message to room:", roomId);

    await this.saveMessage(roomId, message, userId); // before send the msg store it in database

    userManager.getUsers().forEach(user => {
      console.log("Checking user rooms:", user.rooms);

      if (user.rooms.includes(roomId)) {
        console.log("Sending to:", user.userId);

        user.ws.send(
          JSON.stringify({
            type: "chat",
            roomId,
            message,
            userId
          })
        );
      }
    });

  } catch (err) {
    console.error("SendMessage Error:", err);
  }
}
}
export const roomManager = new RoomManager();

 