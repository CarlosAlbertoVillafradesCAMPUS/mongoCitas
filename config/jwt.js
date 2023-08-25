import {SignJWT, jwtVerify} from "jose";
import dotenv from "dotenv";
import conexion from "../db/connect.js";

dotenv.config();
let dataBase = await conexion();

const generateToken = async (req,res,next) =>{
    console.log(req.body);
    if(Object.keys(req.body).length === 0) return res.status(400).send({status:400,message:"Datos no ingresados"});
    let coleccion = dataBase.collection("medico");
    const result = await coleccion.findOne(req.body);
    if (!result) return res.status(401).send({message: "Usuario no encontrado"});
    const encoder = new TextEncoder();
    let id = result.med_nroMatriculaProfesional.toString();
    const jwtConstructor = await new SignJWT({ id: id})
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('3h')
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    req.data = {status: 200, message: jwtConstructor};
    next()
}

export{
    generateToken
}