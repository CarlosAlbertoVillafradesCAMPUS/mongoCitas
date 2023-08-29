import {Router} from "express";
import { validatePermisos } from "../../../helpers/validatePermisos.js";
import conexion from "../../../db/connect.js";

const dataBase = await conexion();

let usuarioV1 = Router();

// 1.Obtener todos los pacientes alfabéticamente
usuarioV1.get("/", validatePermisos("get_usuario"), async (req,res)=>{
    try {

        let tabla = dataBase.collection("usuario")
        let data = await tabla.aggregate([
            {
                $sort: {
                    usu_nombre: +1
                }
            },
            { 
                $project: {
                    "_id":0
                }
            }
        ]).toArray();

        res.send(data)

    } catch (error) {
        res.send({status: 400, message: "Error al obtener lo datos"})
    }
    
})

export {
    usuarioV1
}