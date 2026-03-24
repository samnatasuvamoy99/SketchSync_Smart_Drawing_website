import express ,{Router} from "express";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
import { createRoomController ,chatAllMessages , roomIdFromSlug} from "../controllers/chatroom.controller.js";

const roomRouter :Router = express.Router();

roomRouter.post("/create-room",AuthMiddleware,createRoomController);
roomRouter.get("/chats/:roomId" , AuthMiddleware, chatAllMessages ); // take  all messages
roomRouter.get("chatroom/:slugName" ,AuthMiddleware , roomIdFromSlug); //room-name

export default roomRouter;