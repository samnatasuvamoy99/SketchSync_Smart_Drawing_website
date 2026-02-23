import dotenv from "dotenv";
dotenv.config();
import {prisma} from "@repo/db/client"
import { userRoomSchema} from "../schema/userdata_validation.schema.js";



export const CreateRoomService = async (body :any , userId: number)=>{
     
   const parseData =userRoomSchema.safeParse(body);

     if(!parseData.success){
         throw new Error("Invalid input provide correct input....!");
     }

     const {roomName} = parseData.data;

     if(!roomName){
       throw new Error("USER_ROOM_NAME_NOT_FOUND");
     }
   
     const room = await prisma.room.create({
         data:{
          slug:roomName,
          adminId:userId
         }

     });
   return room;
}