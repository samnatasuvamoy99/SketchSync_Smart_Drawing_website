import express, { Router } from "express";
import { signupController ,signinController} from "../controllers/auth.controller.js";

const userRouter: Router = express.Router();

//cookies_testing.......
userRouter.get("/test", (req, res) => {
  console.log(req.cookies);
  res.json(req.cookies);
});

userRouter.post("/signup", signupController);
userRouter.post("/signin" ,signinController );

export default userRouter;



