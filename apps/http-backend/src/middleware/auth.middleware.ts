import "dotenv/config";
import { Request , Response , NextFunction } from "express";
import jwt  from "jsonwebtoken";



 export const AuthMiddleware =( req:Request , res:Response , next:NextFunction)=>{
     
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "No token found in cookies",
    });
  }

  try {
    const decoded = jwt.verify(
      token  || 
      req.headers.authorization?.split(" ")[1], // cookies plus bearer token two case 

          process.env.JWT_PASSWORD as string
    ) as jwt.JwtPayload;

    if (!decoded.id) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user_Id = decoded.id; // set user_id in the req......

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }

 }