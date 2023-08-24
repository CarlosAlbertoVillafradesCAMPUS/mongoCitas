import dotenv from "dotenv";
import express from "express";

dotenv.config();
let appExpress = express();

let myServer = JSON.parse(process.env.MY_SERVER)
appExpress.listen(myServer, ()=> console.log(`http://${myServer.hostname}:${myServer.port}`))