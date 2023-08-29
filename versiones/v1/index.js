import { Router } from "express";
import { verifyToken } from "../../config/jwt.js";
import { loginV1 } from "./routers/loginV1.js";
import { citasV1 } from "./routers/citasV1.js";
import { usuarioV1 } from "./routers/usuariosV1.js";
import { medicoV1 } from "./routers/medicoV1.js";

const RoutesV1 = Router();
RoutesV1.use(verifyToken)

RoutesV1.use("/login", loginV1)
RoutesV1.use("/citas", citasV1)
RoutesV1.use("/usuarios", usuarioV1)
RoutesV1.use("/medicos", medicoV1)




export default RoutesV1;