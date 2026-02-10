import express from "express"
import {connectDB} from "./config/db.js"
const app = express();
const port = 3000;


async function startServer(){
    await connectDB();

    app.listen(port,()=>{
   console.log(`server is running on port ${port}`);
})

}
    
startServer();



