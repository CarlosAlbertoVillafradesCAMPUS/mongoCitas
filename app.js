import dotenv from "dotenv";
import express from "express";
import routesVersioning from "express-routes-versioning";
import RoutesV1 from "./versiones/v1/index.js";

dotenv.config();
let appExpress = express();
appExpress.use(express.json())

let version = routesVersioning();

appExpress.use(
  "/",
  version({
    "~1.0.0": RoutesV1,
  })
);


let myServer = JSON.parse(process.env.MY_SERVER)
appExpress.listen(myServer, ()=> console.log(`http://${myServer.hostname}:${myServer.port}`))