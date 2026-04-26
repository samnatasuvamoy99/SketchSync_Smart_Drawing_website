import { WebSocket } from "ws";
import { userManager } from "./user.manager";
import { prisma } from "@repo/db/client";
import {
  cleanupSnapshotsByRoom,
  saveMessage,
  saveCoordinate,
} from "../services/room.service";

class RoomManager {
  private rooms: Map<string, Set<WebSocket>> = new Map();

  
  // JOIN ROOM (FIXED)
 
  async joinRoom(ws: WebSocket, roomId: string) {
    const user = userManager.getUser(ws);
    if (!user) return;

    

  let room = null;

  const MAX_RETRIES = 5;
  const DELAY = 300;

  for (let i = 0; i < MAX_RETRIES; i++) {
    room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (room) break;

    await new Promise((r) => setTimeout(r, DELAY));
  }


    //room still not found
    if (!room) {
      ws.send(
        JSON.stringify({
          type: "join_error",
          message: "Room does not exist",
        })
      );
      return;
    }

    
    // ADD USER TO ROOM (MEMORY)
    
    if (!user.rooms.includes(roomId)) {
      user.rooms.push(roomId);
    }

    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }

    this.rooms.get(roomId)!.add(ws);

    const membersOnline = this.rooms.get(roomId)!.size;

    ws.send(
      JSON.stringify({
        type: "join_success",
        payload: {
          success: true,
          roomId,
          roomName: room.slug || roomId,
          membersOnline,
          joinedAt: new Date().toISOString(),
        },
      })
    );

    console.log(`User joined room ${roomId} | Users: ${membersOnline}`);
  }

 
  // LEAVE ROOM
  async leaveRoom(ws: WebSocket, roomId: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    room.delete(ws);

    if (room.size === 0) {
      this.rooms.delete(roomId);

      try {
        await cleanupSnapshotsByRoom(roomId);
        console.log("coordinate deleted");
      } catch (err) {
        console.error("cleanup failed:", err);
      }
    }
  }

  
  // CHAT MESSAGES
  async sendMessage(roomId: string, message: string, userId: string) {
    try {
      console.log("Sending message to room:", roomId);

      await saveMessage(roomId, message, userId);

      userManager.getUsers().forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              roomId,
              message,
              userId,
            })
          );
        }
      });
    } catch (err) {
      console.error("SendMessage Error:", err);
    }
  }

 
  // REALTIME DRAWING
  async sendShapes(roomId: string, coordinate: string) {
    try {
      console.log("Broadcasting drawing to room:", roomId);

      userManager.getUsers().forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "realtime_drawing",
              roomId,
              coordinate,
            })
          );
        }
      });

      await saveCoordinate(roomId, coordinate);
    } catch (err) {
      console.error("SendShapes Error:", err);
    }
  }

  //erase Coordinate
  async eraseShape(roomId: string, shapeId: string) {
  try {
    console.log("Erasing shape:", shapeId);

    //delete from DB
    await prisma.shape.delete({
      where: { id: shapeId },
    });

    //broadcast erase to all users
    userManager.getUsers().forEach((user) => {
      if (user.rooms.includes(roomId)) {
        user.ws.send(
          JSON.stringify({
            type: "erase",
            shapeId,
          })
        );
      }
    });

  } catch (err) {
    console.error("Erase Error:", err);
  }
}
}

export const roomManager = new RoomManager();