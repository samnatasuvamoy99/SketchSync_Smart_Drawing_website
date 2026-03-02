
import {prisma} from "@repo/db/client"
import { userRoomSchema} from "../schema/userdata_validation.schema.js";



export const CreateRoomService = async (body :any , userId: string)=>{
     
   const parseData =userRoomSchema.safeParse(body);

     if(!parseData.success){
         throw new Error("Invalid input provide correct input....!");
     }

     const {roomName} = parseData.data;

     if(!roomName){
       throw new Error("USER_ROOM_NAME_NOT_FOUND");
     }

     if (!userId) {
  throw new Error("User not authenticated");
   }

   
     const room = await prisma.room.create({
         data:{
          slug:roomName,
          adminId:userId
         }

     });

   return room;
}