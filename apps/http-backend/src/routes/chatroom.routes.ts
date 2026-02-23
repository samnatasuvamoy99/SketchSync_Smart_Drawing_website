import express ,{Router} from "express";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
import { createRoomController } from "../controllers/chatroom.controller.js";

const roomRouter :Router = express.Router();

roomRouter.post("/create-room",AuthMiddleware,createRoomController);
 
export default roomRouter;