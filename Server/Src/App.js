import express from "express"; //import the express
import {createServer} from "node:http"; //import the node server
import {Server} from "socket.io"; //our socket server and the express server is dffrent so we have to connect the socket server and the express server for that we use the createserver  
import cors from "cors"; //importing the cors for the cross origen requestes
import mongoose from "mongoose"; //importing the mongoose for the database connectin with the node js
import { config } from "dotenv";
import userRoutes from "./Routes/Users.routes.js";
import connectwithsocket from "./Controllers/connectwithsocket.js";

const app=express();
config({ path: "../.env" }); 
// config();
const dbUri = process.env.DB;
if (!dbUri) {
    throw new Error("Database connection string (DB) is missing. Check your .env file.");
}
//creating the app instance
const server=createServer(app);
//connecting the express server with socket server to combine
// const io=connectTosocket(server);
const io=connectwithsocket(server);
//setting the port from the app (.env files)
app.set("port", (process.env.PORT || 8080)); 
app.use(cors());//for cross origin request
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));


// app.get("/Home",(req,res)=>{
//     return res.json({"Home":"World"});
// });
app.use("/api/v1/users",userRoutes);

console.log(process.env.DB);
const start=async()=>{
    const db= await mongoose.connect(dbUri);
        console.log(`Connectin Sucessfull to the database :${db.connection.host}`)
        server.listen(app.get("port"),()=>{
        console.log("Server is listning to port : 8080");
    })
}


start();