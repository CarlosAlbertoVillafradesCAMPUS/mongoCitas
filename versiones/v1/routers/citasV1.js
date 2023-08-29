import {Router} from "express";
import { validatePermisos } from "../../../helpers/validatePermisos.js";
import conexion from "../../../db/connect.js";

const dataBase = await conexion();

let citasV1 = Router();

// 2.Obtener todas las citas alfabéticamente
citasV1.get("/", validatePermisos("get_citas"), async (req,res)=>{
    try {

        let tabla = dataBase.collection("cita")
        let data = await tabla.aggregate([
            {
                $project:{
                    _id: 0
                }
            }
        ]).toArray();

        res.send(data)

    } catch (error) {
        res.send({status: 400, message: "Error al obtener lo datos"})
    }
    
})

//6.Obtener las consultorías para un paciente específico (por ejemplo, paciente **con usu_id 1**) ?id=""
citasV1.get("/usuario", validatePermisos("get_citas"), async (req,res)=>{
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
                    from: "citas",
                    localField: "usu_id",
                    foreignField: "cit_datosUsuario",
                    as: "info_citas"
                }
            },
            { 
                $project: {
                    _id: 0,
                    usu_acudiente: 0,
                    "info_citas._id": 0,
                    "info_citas.cit_datosUsuario": 0
                }
            }
        ]).toArray();

        res.send(data)

    }  catch (error) {
        res.send({status: 400, message: "Error al obtener lo datos"})
    }
    
})


export {
    citasV1
}