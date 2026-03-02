
import { CreateRoomService} from "../service/chatroom.service.js";
import { Request, Response } from "express";

export const createRoomController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user_Id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const room = await CreateRoomService(req.body, userId);

    res.status(201).json({
      message: "Room created successfully",
      roomId:room.id,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
