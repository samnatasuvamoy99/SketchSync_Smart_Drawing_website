import {prisma} from "@repo/db/client";



// delete all coordinate after disconnect the meeting
// export async function cleanupSnapshotsByRoom(roomId: string) {
//   const TWO_MINUTES = 2 * 60 * 1000;
//   //const cutoff = new Date(Date.now() - TWO_MINUTES);

// console.log("coordinate deleted");

//   const result = await prisma.shape.deleteMany({
//     where: {
//       roomId,
      
//     },
     
//   });

//   console.log(`Old snapshots deleted for room ${roomId}:`, result.count);
// }

export async function cleanupSnapshotsByRoom(roomId: string) {


  console.log("Cleaning old snapshots for room:", roomId);

  const result = await prisma.shape.deleteMany({
    where: {
      roomId
    },
  });

  console.log(
    `Old snapshots deleted for room ${roomId}:`,
    result.count
  );

  return result.count;
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
      const parsed = JSON.parse(coordinate);
      const shape = parsed.shape;

  if (!shape?.id || !shape?.type) {
    console.log("Invalid shape:", shape);
    return;
  }


  const room = await prisma.room.findUnique({
    where: { id: roomId }
  });

  if (!room) {
    throw new Error(`Room ${roomId} does not exist`);
  }

  await prisma.shape.create({
    data: {
       id: shape.id, 
      roomId: roomId,
      type: shape.type, 
      coordinates:shape
     
    }
  });

  console.log("database pushed the coordinates");
}
