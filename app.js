import dotenv from "dotenv";
import express from "express";
import { appLogin } from "./routers/login.js";

dotenv.config();
let appExpress = express();
appExpress.use(express.json())

appExpress.use("/login", appLogin);

let myServer = JSON.parse(process.env.MY_SERVER)
appExpress.listen(myServer, ()=> console.log(`http://${myServer.hostname}:${myServer.port}`))