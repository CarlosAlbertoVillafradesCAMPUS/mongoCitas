export const validatePermisos = (requiredPermission) => async (req, res, next) => {

    const permisos = req.data.payload.role.permisos;
  
    if (!permisos.includes("*")) {
      if (!permisos.includes(requiredPermission)){
        return res.status(401).send("No tienes permiso para acceder");}
        else{
            next()
        }
    }
    next();
  };