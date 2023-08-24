import {Router} from "express";
import routesVersioning from "express-routes-versioning";
import {loginV1} from "../versiones/v1/loginV1.js";
import {loginV2} from "../versiones/v2/loginV2.js"

let appLogin = Router();
let version = routesVersioning();

appLogin.get("/", version({
    "1.0.0": loginV1,
    "~2.2.1": loginV2
}))

export {
    appLogin
}