
import { CreateRoomResponse, JoinRoomResponse, FetchMessageResponse, BackendMessage } from '../types/RoomType';
import { BACKEND_URL, FRONTEND_URL } from '../config';
import { Message } from '../types/ChatType';
import { getCurrentUser } from "./getCurrentUser"





export async function apiCreateRoom(
  roomName: string,

): Promise<CreateRoomResponse> {

  const res = await fetch(`${BACKEND_URL}/message/v2/admin/chat/create-room`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ roomName }),
  });
  if (!res.ok) throw new Error("Failed to create room");


  // return res.json();
  const result = await res.json();
  console.log(result.id);

  if (!FRONTEND_URL) {
    throw new Error("FRONTEND_URL is not defined");
  }

  await new Promise((r) => setTimeout(r, 800));
  const id = result.roomId;
  alert(result.message);

  return {
    id,
    roomName,
    link: `${FRONTEND_URL}/room/${id}`,
    createdAt: new Date().toISOString(),
    membersOnline: 23

  };
}



/** Simulated API: join room */
export async function apiJoinRoom(
  roomId: string,

): Promise<JoinRoomResponse> {
  // Uncomment below for real API call:
  // const res = await fetch(`${base}/api/rooms/join`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ roomId }),
  // });
  // if (!res.ok) throw new Error("Room not found");
  // return res.json();

  // ── MOCK ──
  await new Promise((r) => setTimeout(r, 700));
  if (roomId.trim().length < 4) throw new Error("Room not found");
  return {
    success: true,
    roomId,
    roomName: roomId.startsWith("ROOM-") ? "design-sprint" : roomId,
    membersOnline: Math.floor(Math.random() * 8) + 1,
    joinedAt: new Date().toISOString(),
  };
}


/** Simulated API: fetch messages for a room */
export async function FetchMessages(data: BackendMessage): Promise<Message[]> {
  const res = await fetch(
    `${BACKEND_URL}/message/v2/admin/chat/chats/${data.roomId}`,
    {
      method: "GET",
      credentials: "include", // if using auth cookies
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch messages");
  }

  const result: FetchMessageResponse = await res.json();

  const currentUserId = await getCurrentUser(); // get the current userId;


  return result.messages.map((msg) => ({
    id: msg.id,
    sender: msg.userId,
    text: msg.message,
    isSelf: msg.userId === currentUserId,  // if msg.userId === currentUserId( get this  through the login details in browsers); that;s mean 
    createdAt: msg.createdAt, // optional
  }));
}