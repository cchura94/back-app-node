import models from "./../models"

export const lista = async function(req, res){
    try{
        // realizar Busquedas
        const datos = await models.Producto.findAll();
        res.json(datos);
    }catch(error){
        res.status(500).send({
            mensaje: error.message || 'Error al consultar la base de datos'
        })
    }
}

export const guardar = function(req, res){
    // validar
    // subir imagen
    if(req.file){
        console.log(req.file.filename)
        res.send("Tiene Imagenes...");
    }else{
        res.send("No Tiene Imagenes...");
    }
    // guardar
    // responder
    res.send("Imagen subida...");
}

export const mostrar = function(req, res){

}

export const modificar = function(req, res){

}

export const eliminar = function(req, res){

}