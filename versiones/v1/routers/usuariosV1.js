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

//4. Encontrar la próxima cita para un usuario específico (por ejemplo, el paciente con **usu_id 1**) ?id
usuarioV1.get("/unico", validatePermisos("get_usuario"), async (req,res)=>{
    try {  
        let id = req.query.id
        id = parseInt(id)

        let tabla = dataBase.collection("usuario")
        let data = await tabla.aggregate([
            {
                $match: {
                    usu_id: id
                }
            },
            {
                $lookup: {
                    from: "cita",
                    localField: "usu_id",
                    foreignField: "cit_datosUsuario",
                    as: "info_Usuario"
                }
            },
            {
                $unwind: "$info_Usuario"
            },
            {
                $match: {
                    "info_Usuario.cit_estadoCita": "Activa"
                }
            },
            { 
                $project: {
                    _id: 0,
                    usu_acudiente: 0,
                    "info_Usuario._id": 0,
                    "info_Usuario.cit_datosUsuario": 0
                }
            }
        ]).toArray();

        res.send(data)

    }  catch (error) {
        res.send({status: 400, message: "Error al obtener lo datos"})
    }
    
})

export {
    usuarioV1
}