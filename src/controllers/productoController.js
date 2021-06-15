import models from "./../models"

export const lista = async function(req, res){

    // 127.0.0.1:3000/api/producto?page=1&limit=20
    try{
        // realizar Busquedas
        // Paginación
        let page = req.query.page;
        let limit = req.query.limit;
        let offset = 0 + (page - 1) * limit
        const datos = await models.Producto.findAndCountAll({
            limit: limit,
            offset: offset,
            
        });
        res.json(datos);
    }catch(error){
        res.status(500).send({
            mensaje: error.message || 'Error al consultar la base de datos'
        })
    }
}

export const guardar = async function(req, res){
    // validar
    let { nombre, cantidad } = req.body;
    if(typeof nombre != String && !nombre){
        res.status(400).send({
            error: true,
            mensaje: "el campo nombre no deberia estar vacio y debe ser Cadena"
        })
    }else{
        try{
            // subir imagen
            if(req.file){
                console.log(req.file.filename)
                req.body.imagen = req.file.filename;
            }
            // guardar
        
            let data = await models.Producto.create(req.body);
            // responder
            res.json({
                mensaje: "Producto Registrada",
                data: data,
                error: false
            });
        }catch(error){
            res.status(500).send({
                error: true,
                mensaje: error.message || 'Error al guardar en la base de datos'
            })
        }

    }
}

export const mostrar = function(req, res){

}

export const modificar = function(req, res){

}

export const eliminar = function(req, res){

}