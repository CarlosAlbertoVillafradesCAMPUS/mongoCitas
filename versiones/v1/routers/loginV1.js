import {Router} from "express";
import {generateToken} from "../../../config/jwt.js"

let loginV1 = Router();

loginV1.get("/", generateToken, (req,res)=>{
    res.status(req.data.status).send(req.data);
})

export {
    loginV1
}