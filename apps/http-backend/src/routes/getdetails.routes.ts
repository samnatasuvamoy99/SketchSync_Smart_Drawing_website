import express , {Router} from "express";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
import { getRoomIdController , getCurrentUsername} from "../controllers/getdetails.controller.js";

const FetchDetails:Router = express.Router();



FetchDetails.get("/from/adminId",AuthMiddleware , getRoomIdController);

//get username 
FetchDetails.get("/username", AuthMiddleware, getCurrentUsername);




export default FetchDetails;
