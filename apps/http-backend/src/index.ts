
import express from "express"
import {connectDB} from "./config/db.js"
import cors from "cors"
import userRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user/auth",userRouter)





async function startServer(){
    await connectDB();

    app.listen(port,()=>{
   console.log(`server is running on port ${port}`);
})

}
    
startServer();



