
import express from "express"
import dotenv from "dotenv"
import connectDB from "./Database/connection.js";
import cors from "cors"
import adminroutes from "./routes/Adminroutes.js";


const app=express();
dotenv.config()
const port=process.env.PORT ||4001


app.use(express.json());


app.use(cors({
    origin: ['http://localhost:5173','http://localhost:5173','http://localhost:5174','http://localhost:5174/'],
    credentials: true
  }));
  
  connectDB();
  app.use("/admin", adminroutes)

app.listen(port,()=>{
    console.log(`server is running is port : ${port}`);
})