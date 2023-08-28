import {Router} from "express";
import routesVersioning from "express-routes-versioning";
import { verifyToken } from "../config/jwt.js";
import { citasv1 } from "../versiones/v1/citasv1.js";


let appCitas = Router();
let version = routesVersioning();

appCitas.get("/", verifyToken(""), version({
    "1.0.0": citasv1
}))

export {
    appCitas
}