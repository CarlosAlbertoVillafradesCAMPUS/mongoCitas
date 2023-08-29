import { Router } from "express";
import { verifyToken } from "../../config/jwt.js";
import { loginV1 } from "./routers/loginV1.js";
import { citasV1 } from "./routers/citasV1.js";
import { usuarioV1 } from "./routers/usuariosV1.js";
import { medicoV1 } from "./routers/medicoV1.js";
import { limitLogin, limitUsuario } from "../../config/limit.js";

const RoutesV1 = Router();

RoutesV1.use("/login", limitLogin(), loginV1)
RoutesV1.use("/citas", limitUsuario(), verifyToken(), citasV1)
RoutesV1.use("/usuarios", limitUsuario(), verifyToken(), usuarioV1)
RoutesV1.use("/medicos", limitUsuario(), verifyToken(), medicoV1)




export default RoutesV1;