import models, { sequelize } from "./../models"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { tiempo_expiracion, codigo_secreto } from './../config/config'
// import * as config from "./../config/config"

var BCRYPT_SALT_ROUNDS = 12;
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
            let verif = await bcrypt.compare(req.body.password, user.password);
            if(verif){
                // generar el token (jwt)
                const payload = {
                    correo: user.email,
                    id: user.id,
                    time: new Date(),
                    tiempo_expiracion: tiempo_expiracion
                }

                let token = jwt.sign(payload, codigo_secreto, {
                    expiresIn: tiempo_expiracion
                });
                
                res.json({usuario: payload, token: token, error: false})
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

    // insert into usuarios (email, password) values ('')
    models.Usuario.create(req.body).then((user) => {
        res.json({mensaje: "Usuario Registrado", error: false})
    }).catch(error => {
        console.log(error);
        res.json({mensaje: "Error al registrar el usuario", error: true});
    })    
}

export const registroUsuario2 = async function(req, res){
    // validar
    try{
        let hashedPassword = await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
        req.body.password = hashedPassword

        console.log("********* ", hashedPassword)

        let user = await models.Usuario.findOne({
            where: {
                email: req.body.email
            }
        });

        if(user){
            res.json({mensaje: "El correo ya está registrado",error: true})
        }else{
            let user = await models.Usuario.create(req.body);
            console.log(user)
            res.json({mensaje: "Usuario Registrado", dato: user,error: false})
        }
 
    }catch(error){
        console.log(error);
        res.json({mensaje: "Error al registrar el usuario", error: true});
    }
}
