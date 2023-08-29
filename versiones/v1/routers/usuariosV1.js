import {Router} from "express";
import { validatePermisos } from "../../../helpers/validatePermisos";

let usuarioV1 = Router();

usuarioV1.get("/", validatePermisos("get_usuario"), (req,res)=>{
    res.send("soy usuariosss")
})

export {
    usuarioV1
}