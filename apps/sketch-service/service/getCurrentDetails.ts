import { BACKEND_URL } from "@/config";


//this is the current userId ;
export async function getCurrentUser() {
  const res = await fetch(`${BACKEND_URL}/api/v1/user/auth/api/me`, {
    credentials: "include",
  });

  const user = await res.json();
  return user;
}


//get roomId through current login user...

export async function getCurrentUserRoomId() {

  const res = await fetch(`${BACKEND_URL}/fetchRomId/v3/from/adminId`, {
    credentials: "include",
  })

   const roomId =  await res.json();
  return roomId;
}
