import { AllCoordinate } from "../controllers/shape.controller.js";
import express ,{Router} from "express";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
const takeCoordinate :Router = express.Router();

takeCoordinate.get("/coordinate/:roomId",AllCoordinate); 

export default takeCoordinate;