"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eliminar = exports.modificar = exports.guardar = exports.lista = void 0;

var _models = _interopRequireDefault(require("./../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const lista = async function (req, res) {
  // select * from proveedores (SQL)
  try {
    let datos = await _models.default.Proveedor.findAll({
      order: [['id', 'DESC']]
    });
    res.json(datos);
  } catch (error) {
    res.status(500).send({
      mensaje: error.message || 'Error al consultar la base de datos'
    });
  }
};

exports.lista = lista;

const guardar = async function (req, res) {
  // validar
  let datos_prov = req.body;

  if (!datos_prov.nombre) {
    res.status(400).send({
      error: true,
      mensaje: "el campo nombre no deberia estar vacio"
    });
  } else {
    //guardamos
    try {
      let data = await _models.default.Proveedor.create(datos_prov);
      res.json({
        mensaje: "Proveedor Registrado",
        data: data,
        error: false
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        mensaje: error.message || 'Error al guardar en la base de datos'
      });
    }
  }
};

exports.guardar = guardar;

const modificar = async function (req, res) {
  const id_prov = req.params.id;

  try {
    // UPDATE Proveedor nombre='prueba' where id: id_cat  
    let data = await _models.default.Proveedor.update(req.body, {
      where: {
        id: id_prov
      }
    });
    res.json({
      mensaje: "Proveedor Modificado",
      data: data,
      error: false
    });
  } catch (error) {
    res.status(500).send({
      error: true,
      mensaje: error.message || 'Error al modificar en la base de datos'
    });
  }
};

exports.modificar = modificar;

const eliminar = async function (req, res) {
  let id_cat = req.params.id; //  DELETE FROM "Categoria" WHERE "id" = '2'

  await _models.default.Proveedor.destroy({
    where: {
      id: id_cat
    }
  });
  res.json({
    mensaje: "Proveedor Eliminada",
    error: false
  });
};

exports.eliminar = eliminar;