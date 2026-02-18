dotenv.config();
import dotenv from "dotenv";
import { UsersSignupService, UserSigninService } from "../service/auth.service.js"
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";




export const signupController = async (req: Request, res: Response) => {
  try {
    await UsersSignupService(req.body);
    res.status(201).json({
      message: "Welcome to DrawSite!"
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ errors: error.errors });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0];

      return res.status(409).json({
        message: `${field} already exists`
      });
    }

    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
}

export const signinController = async (req: Request, res: Response) => {

  try {
    const { user, password } = await UserSigninService(req.body);
  
    if (!user) {
      return res.status(404).json({
        message: "Does not find any users...!"
      })
    }
  
    if (!user.password) {
      return res.status(404).json({
        message: "provide the correct email_id!"
      })
    }
  
    const password_match = await bcrypt.compare(password, user.password);
  
    if (password_match) {
      if (!process.env.JWT_PASSWORD) {
        console.error("JWT_PASSWORD environment variable is not set");
        return res.status(500).json({
          message: "Server configuration error. Please contact support."
        });
      }
  
  
    }
    else {
      return res.status(403).json({
        message: "invalid login details !!"
      })
    }

     //  Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
          process.env.JWT_PASSWORD as string,
        { expiresIn: "7d" }
      );
  
      console.log(token);  ///----------------------
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        // domain: ".example.com",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });


    return res.status(200).json({
      message: "Login successful"
    });
  
  } catch (error:any) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Something went wrong during signup.", error: error.message });
  }

}

