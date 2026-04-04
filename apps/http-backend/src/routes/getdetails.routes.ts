import express , {Router} from "express";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
import { getRoomIdController } from "../controllers/getdetails.controller.js";


const FetchDetails:Router = express.Router();
FetchDetails.get("/from/adminId",AuthMiddleware , getRoomIdController);

export default FetchDetails;

