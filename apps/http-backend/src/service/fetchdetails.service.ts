import {prisma} from "@repo/db/client";

export const getRoomIdByAdminId = async (userId: string) => {
  const roomId = await prisma.room.findFirst({
    where: {
       adminId:userId
    }
  });

  if (!roomId) {
    throw new Error("RoomId not found");
  }

  return roomId;
};