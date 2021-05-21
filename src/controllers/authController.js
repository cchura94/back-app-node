import models from "./../models"

/**
 * Permite autenticarme
 * @param {*} req petición cliente
 * @param {*} res respuesta servidor
 */
export const ingresar = function(req, res){

    models.Usuario.findAll({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        console.log(user.length)
        if(user.length == 0){
            res.json({mensaje: "El Usuario no existe", error: true})
        }else{
            if(req.body.password == user[0].password){
                res.json({mensaje: "Bienvenido", data: user, error: false})
            }else{
                res.json({mensaje: "Contrseña incorrecta", error: true})
            }
        }
    }).catch(error => {
        console.log(error);
        res.json({mensaje: "Error al authenticar", error: true});
    })
    // logica 
    //res.json({mensaje: "Bienvenido usuario", error: false});
}


/**
 * Registro de un nuevo Usuario
 * @param {*} req 
 * @param {*} res 
 */
export const registroUsuario = function (req, res){
    console.log(req.body);

    models.Usuario.create(req.body).then((user) => {
        res.json({mensaje: "Usuario Registrado", error: false})
    }).catch(error => {
        console.log(error);
        res.json({mensaje: "Error al registrar el usuario", error: true});
    })
    
}

