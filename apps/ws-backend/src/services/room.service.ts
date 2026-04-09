import {prisma} from "@repo/db/client";


// delete all coordinate after disconnected meeting

export async function cleanupSnapshotsByRoom(roomId: string) {
  const TWO_MINUTES = 2 * 60 * 1000;
  const cutoff = new Date(Date.now() - TWO_MINUTES);

  const result = await prisma.snapshot.deleteMany({
    where: {
      roomId,
      createdAt: {
        lt: cutoff,
      },
    },
  });

  console.log(`Old snapshots deleted for room ${roomId}:`, result.count);
}



  // store message in db 
 export async function saveMessage(roomId: string, message: string, userId: string) {

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


// saver coordinate in database
export async function saveCoordinate(roomId: string,  coordinate:any) {

  const room = await prisma.room.findUnique({
    where: { id: roomId }
  });

  if (!room) {
    throw new Error(`Room ${roomId} does not exist`);
  }

  await prisma.snapshot.create({
    data: {
      roomId: roomId,
      coordinates:coordinate
     
    }
  });

  console.log("database pushed the coordinates");
}
