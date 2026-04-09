import { WebSocket } from "ws";
import { userManager } from "./user.manager";
import { prisma } from "@repo/db/client"
import { cleanupSnapshotsByRoom, saveMessage, saveCoordinate } from "../services/room.service";
class RoomManager {

  private rooms: Map<string, Set<WebSocket>> = new Map();

  //joinRoom logic...
  
  async joinRoom(ws: WebSocket, roomId: string) {
    const user = userManager.getUser(ws);
    if (!user) return;

    //  check room exists in DB
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      ws.send(
        JSON.stringify({
          type: "join_error",
          message: "Room does not exist",
        })
      );
      return;
    }

    // add user → user.rooms
    if (!user.rooms.includes(roomId)) {
      user.rooms.push(roomId);
    }

    // add user → room map
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }

    this.rooms.get(roomId)!.add(ws);

    const membersOnline = this.rooms.get(roomId)!.size;

    //send response
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

  leaveRoom(ws: WebSocket, roomId: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    room.delete(ws);

    if (room.size === 0) {
      this.rooms.delete(roomId);

      //  DELETE coordinates when empty
      cleanupSnapshotsByRoom(roomId);
    }
  }


  // sendMessage logic
  async sendMessage(roomId: string, message: string, userId: string) {
    try {
      console.log("Sending message to room:", roomId);

      await saveMessage(roomId, message, userId); // before send the msg store it in database

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

  //broadcast the   coordinates
  async sendShapes(roomId: string, coordinate: string) {
    try {
      console.log("Sending message to room:", roomId);



      userManager.getUsers().forEach(user => {
        console.log("Checking user rooms:", user.rooms);

        if (user.rooms.includes(roomId)) {
          console.log("Sending to:", user.userId);

          user.ws.send(
            JSON.stringify({
              type: "realtime_drawing",
              roomId,
              coordinate
            })
          );
        }
      });

      // Then store in DB
      await saveCoordinate(roomId, coordinate);


    } catch (err) {
      console.error("SendMessage Error:", err);
    }
  }

}
export const roomManager = new RoomManager();

