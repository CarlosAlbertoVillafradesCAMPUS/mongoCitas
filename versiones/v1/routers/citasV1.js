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

export {
    citasV1
}