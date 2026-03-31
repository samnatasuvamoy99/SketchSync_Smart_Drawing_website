// write the  endpoint that;s return the existing shapes..............

import { BACKEND_URL } from "@/config";

export async function getExistingShapes(roomId :string): Promise<Message[]> {
  const res = await fetch(
    `${BACKEND_URL}/shapes/v3/room/chats/shapes/${roomId}`,
    {
      method: "GET",
      credentials: "include", // if using auth cookies
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch messages");
  }



  
}