import { getRoomIdByAdminId } from "../service/fetchdetails.service.js";
import { Request, Response } from "express";
import { prisma } from "@repo/db/client";



export const getRoomIdController = async (req:Request, res: Response) => {
  try {
 
    const userId = req.user_Id;   // from middleware take userId directly
    

       console.log(userId);


    const roomId = await getRoomIdByAdminId( userId);

    return res.status(200).json({
      roomId: roomId.id,
      
    });
  } catch (err: any) {
    return res.status(400).json({
      message: err.message || "Something went wrong",
    });
  }
};


// get user name
export const getCurrentUsername =  async (req:Request, res:Response) => {
  const user = await prisma.user.findUnique({
  where: {
    id: req.user_Id,
  },
});

   if (!user) {
  return res.status(404).json({
    message: "User not found",
  });
}
  res.json({
    username: user?.username,
  });
}



