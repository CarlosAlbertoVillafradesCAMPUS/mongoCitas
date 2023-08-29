export const validatePermisos = (requiredPermission) => async (req, res, next) => {
  console.log(req.data);
    const permisos = req.data.payload.role.permisos;
  
    if (!permisos.includes("*")) {
      if (!permisos.includes(requiredPermission)){
        return res.status(401).send({status:401, message:"No tienes permiso para acceder"});}
        else{
            next()
        }
    }
    next();
  };