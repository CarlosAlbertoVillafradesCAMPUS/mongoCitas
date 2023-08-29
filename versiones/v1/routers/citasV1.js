import {Router} from "express";
import { verifyToken } from "../../../config/jwt.js";

let citasV1 = Router();

citasV1.get("/", verifyToken(""), (req,res)=>{
    res.send("soy citassss")
})

export {
    citasV1
}