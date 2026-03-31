import express, { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
import { signupController ,signinController , currentUser} from "../controllers/auth.controller.js";

const userRouter: Router = express.Router();

//cookies_testing.......
userRouter.get("/test", (req, res) => {
  console.log(req.cookies);
  res.json(req.cookies);
});


userRouter.post("/signup", signupController);
userRouter.post("/signin" ,signinController );
userRouter.get("/api/me",AuthMiddleware, currentUser);

export default userRouter;



