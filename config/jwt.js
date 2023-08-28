import {SignJWT, jwtVerify} from "jose";
import dotenv from "dotenv";
import conexion from "../db/connect.js";

dotenv.config();
let dataBase = await conexion();

const generateToken = async (req,res,next) =>{
    if(Object.keys(req.body).length === 0) return res.status(400).send({status:400,message:"Datos no ingresados"});
    let coleccion = dataBase.collection("medico");

    let {User,Password} = req.body;

    const result = await coleccion.findOne({med_nroMatriculaProfesional: User, password: Password});

    if (!result) return res.status(401).send({message: "Usuario no encontrado"});
    const encoder = new TextEncoder();
    
    let data = {
        id: result._id.toString(),
        role: result.role
    }

    const jwtConstructor = await new SignJWT(data)
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('3h')
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    req.data = {status: 200, message: jwtConstructor};
    next()
}

    const verifyToken = (accessIndicator) => async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
      return res.status(400).json({ status: 400, message: "Porfavor generar Token" });
  
    const encoder = new TextEncoder();
    const jwtData = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
  
    const permisos = jwtData.payload.role.permisos;
  
    if (!permisos.includes("*")) {
      if (!permisos.includes(accessIndicator)){
        return res.status(401).send("No tienes permiso para acceder");}
        else{
            next()
        }
    }
    next();
  };

export{
    generateToken,
    verifyToken
}