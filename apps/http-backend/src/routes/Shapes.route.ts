import { AllCoordinate } from "../controllers/shape.controller.js";
import express ,{Router} from "express";
const takeCoordinate :Router = express.Router();

takeCoordinate.get("/coordinate/:roomId" ,AllCoordinate); 

export default takeCoordinate;