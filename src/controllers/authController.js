/**
 * Permite autenticarme
 * @param {*} req petición cliente
 * @param {*} res respuesta servidor
 */

export const ingresar = function(req, res){
    // logica 
    res.json({mensaje: "Bienvenido usuario", error: false});
}

