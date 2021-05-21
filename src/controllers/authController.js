import models, { sequelize } from "./../models"

/**
 * Permite autenticarme
 * @param {*} req petición cliente
 * @param {*} res respuesta servidor
 */
export const ingresar = function(req, res){
    // select * from usuarios where email = req.body.email
    //sequelize.query(`select * from usuarios where email = ${req.body.email}`)
    models.Usuario.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {        
        
        console.log(user)
        if(!user){
            res.json({mensaje: "El Usuario no existe", error: true})
        }else{
            if(req.body.password == user.password){
                res.json({mensaje: "Bienvenido", data: user, error: false})
            }else{
                res.json({mensaje: "Contraseña incorrecta", error: true})
            }
        }
    }).catch(error => {
        console.log(error);
        res.json({mensaje: "Error al authenticar", error: true});
    })
    // logica 
    //res.json({mensaje: "Bienvenido usuario", error: false});
}

// async await

export const ingresar2 = async function (req, res){

    try {
        let user = await models.Usuario.findOne({
            where: {
                email: req.body.email
            }
        });
    
        if(!user){
            res.json({mensaje: "El Usuario no existe", error: true})
        }else{
            if(req.body.password == user.password){
                res.json({mensaje: "Bienvenido", data: user, error: false})
            }else{
                res.json({mensaje: "Contraseña incorrecta", error: true})
            }
        }
    } catch (error) {
        console.log(error);
        res.json({mensaje: "Error al authenticar", error: true});
    }

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

