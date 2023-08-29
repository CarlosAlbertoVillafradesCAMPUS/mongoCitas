import {Router} from "express";
import { validatePermisos } from "../../../helpers/validatePermisos.js";
import conexion from "../../../db/connect.js";

const dataBase = await conexion();

let medicoV1 = Router();

// 3.Obtener todos los médicos de una especialidad específica (por ejemplo, **'Cardiología'**) ?especialidad=""

medicoV1.get("/", validatePermisos("get_medicos"), async (req,res)=>{
  try {

    let especialidad = req.query.especialidad
    console.log(especialidad);

    let tabla = dataBase.collection("medico")
    let data = await tabla.aggregate([
        {
            $match: {
                "med_especialidad": especialidad
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ]).toArray();

    res.send(data)

} catch (error) {
    res.send({status: 400, message: "Error al consultar la collection"})
}
})

export {
    medicoV1
}