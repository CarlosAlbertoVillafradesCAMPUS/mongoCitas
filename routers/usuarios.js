import {Router} from "express";
import routesVersioning from "express-routes-versioning";
import { verifyToken } from "../config/jwt.js";
import { usuarioV1 } from "../versiones/v1/usuarioV1.js";


let appUsuarios = Router();
let version = routesVersioning();

appUsuarios.get("/", verifyToken("user"), version({
    "1.0.0": usuarioV1
}))

export {
    appUsuarios
}