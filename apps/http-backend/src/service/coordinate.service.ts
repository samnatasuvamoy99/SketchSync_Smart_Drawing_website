import {ChatRoomId} from "../schema/data_validation.schema.js";
import { prisma } from "@repo/db/client";


// Service -> fetch all the drawing coordinate 
export const FetchCoordinate = async (body: any) => {
  const parsed = ChatRoomId.safeParse(body);

  if (!parsed.success) {
    throw new Error("RoomId not Found");
  }

  const Coordinate= await prisma.snapshot.findMany({
    where: {
       roomId:parsed.data
      },
    orderBy:{
        id:"desc"
    },
    take:50
  });

   return Coordinate;
};
