import { CreateRoomResponse, JoinRoomResponse } from '../types/room-type';


/** Generates a local room ID (used as fallback if API is offline) */
const localUID = () =>
  "ROOM-" +
  Math.random().toString(36).slice(2, 6).toUpperCase() +
  "-" +
  Math.random().toString(36).slice(2, 6).toUpperCase();



/* ─────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────── */


export async function apiCreateRoom(
  name: string,
  base: string
): Promise<CreateRoomResponse> {
  // Uncomment below for real API call:
  // const res = await fetch(`${base}/api/rooms`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ name }),
  // });
  // if (!res.ok) throw new Error("Failed to create room");
  // return res.json();

  // ── MOCK ──
  await new Promise((r) => setTimeout(r, 800));
  const id = localUID();
  return {
    id,
    name,
    link: `sketching.link/room/${id.toLowerCase()}`,
    createdAt: new Date().toISOString(),
    membersOnline: 1,
  };
}

/** Simulated API: join room */
 export async function apiJoinRoom(
  roomId: string,
  base: string
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

