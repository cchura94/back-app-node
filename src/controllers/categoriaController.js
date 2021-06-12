// import el Model Categoria
import models from "./../models"

export const lista = async function(req, res){
    // select * from categorias (SQL)
    try{
        let datos = await models.Categoria.findAll();
        // ver todas las categorias + eliminar
        /*let datos = await models.Categoria.findAll({
            paranoid: false
        });
        */
       // recuperar una categoria eliminada 3
       /*await models.Categoria.restore({
           where: {id:3}
       })
       res.send([]);
       */
        res.json(datos);
    }catch(error){
        res.status(500).send({
            mensaje: error.message || 'Error al consultar la base de datos'
        })
    }

}

export const guardar = async function(req, res){
    // validar
    let datos_cat = req.body

    if(!datos_cat.nombre){
        res.status(400).send({
            error: true,
            mensaje: "el campo nombre no deberia estar vacio"
        })
    }
    //guardamos
    try{
        let data = await models.Categoria.create(datos_cat);
        res.json({
            mensaje: "Categoria Registrada",
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

export const modificar = async function(req, res){
    const id_cat = req.params.id;
    try{
        // UPDATE Categoria nombre='prueba' where id: id_cat  
        await models.Categoria.update(req.body, {
            where: {
                id: id_cat
            }
        })

    } catch(error){
        res.status(500).send({
            error: true,
            mensaje: error.message || 'Error al modificar en la base de datos'
        })
    }
    
}

export const eliminar = async function(req, res){
    let id_cat = req.params.id;
    //  DELETE FROM "Categoria" WHERE "id" = '2'
    await models.Categoria.destroy({
        where: {id: id_cat}
    });

    res.json({
        mensaje: "Categoria Eliminada",
        error: false
    });
}