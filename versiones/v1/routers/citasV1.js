import {Router} from "express";
import { validatePermisos } from "../../../helpers/validatePermisos.js";

let citasV1 = Router();

citasV1.get("/", validatePermisos("get_citas"), (req,res)=>{
    res.send("soy citassss")
})

export {
    citasV1
}