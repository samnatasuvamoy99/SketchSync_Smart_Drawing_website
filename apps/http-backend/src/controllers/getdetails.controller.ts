import { getRoomIdByAdminId } from "../service/fetchdetails.service.js";
import { Request, Response } from "express";

export const getRoomIdController = async (req: any, res: Response) => {
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

