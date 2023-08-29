import {Router} from "express";
import { verifyToken } from "../../../config/jwt.js";

let medicoV1 = Router();

medicoV1.get("/", verifyToken("user"), (req,res)=>{
    res.send("soy medicosss")
})

export {
    medicoV1
}