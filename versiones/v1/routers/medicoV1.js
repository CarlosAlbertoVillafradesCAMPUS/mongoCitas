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
  res.send({status: 400, message: "Error al obtener lo datos"})
}
})

//5. Encontrar todos los pacientes que tienen citas con un médico específico (por ejemplo, el médico con **med_nroMatriculaProsional 1**) ?nroMatricula
medicoV1.get("/usuarios", validatePermisos("get_medicos"), async (req,res)=>{
  try {

    let numero_matricula = req.query.nroMatricula
    numero_matricula = parseInt(numero_matricula)

    let tabla = dataBase.collection("usuario")
    let data = await tabla.aggregate([
        {
            $lookup: {
                from: "cita",
                localField: "usu_id",
                foreignField: "cit_datosUsuario",
                as: "info_citas"
            }
        },
        {
            $lookup: {
                from: "medico",
                localField: "info_citas.cit_medico",
                foreignField: "med_nroMatriculaProfesional",
                as: "info_medico"
            }
        },
        {
            $match: {
                "info_medico.med_nroMatriculaProfesional": numero_matricula
            }
        },
        {
            $project: {
                _id: 0,
                "info_medico.role":0,
                "info_medico.password":0
            }
        }
    ]).toArray();

    res.send(data)

}  catch (error) {
  res.send({status: 400, message: "Error al obtener lo datos"})
}
})

export {
    medicoV1
}