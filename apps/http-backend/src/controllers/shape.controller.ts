import { ChatRoomId} from "../schema/data_validation.schema.js";
import { Request, Response } from "express";
import { FetchCoordinate } from "../service/coordinate.service.js";
// get all coordinate for shapes....

 export const AllCoordinate = async (req: Request, res: Response) => {
  try {
    // Validate roomId
    const parsed = ChatRoomId.safeParse(req.params.roomId);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid Room ID",
      });
    }

    // Fetch Coordinate
    const Coordinate = await FetchCoordinate(parsed.data);
    console.log("hiii");
    return res.status(200).json({
      success: true,
       Coordinate,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};
