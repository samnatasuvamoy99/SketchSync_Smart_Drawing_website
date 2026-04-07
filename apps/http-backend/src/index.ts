import dotenv from "dotenv";
dotenv.config();
import express from "express";
import {connectDB} from "@repo/db/client"
import cors from "cors"
import userRouter from "./routes/auth.routes.js";
import roomRouter from "./routes/chatroom.routes.js";
import fetchDetails from "./routes/getdetails.routes.js";
import cookieParser from "cookie-parser";
import coordinate from "./routes/Shapes.route.js"

const app = express();
const port = 4000;
// app.use(cors());

app.use(cors({
  origin: "http://localhost:3005",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());



app.use("/api/v1/user/auth",userRouter);
app.use("/message/v2/admin/chat",roomRouter);
app.use("/fetchRomId/v3",fetchDetails);
app.use("/drawingShapes/v4/canvas",coordinate);


async function startServer(){
    await connectDB();

    app.listen(port,()=>{
   console.log(`server is running on port ${port}`);
})

}
    
startServer();



