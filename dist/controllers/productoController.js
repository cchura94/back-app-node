"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eliminar = exports.modificar = exports.mostrar = exports.guardar = exports.lista = void 0;

var _models = _interopRequireDefault(require("./../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const lista = async function (req, res) {
  // 127.0.0.1:3000/api/producto?page=1&limit=20
  try {
    // realizar Busquedas
    // Paginación
    let page = req.query.page;
    let limit = req.query.limit;
    let offset = 0 + (page - 1) * limit;
    const datos = await _models.default.Producto.findAndCountAll({
      limit: limit,
      offset: offset
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
  let {
    nombre,
    cantidad
  } = req.body;

  if (typeof nombre != String && !nombre) {
    res.status(400).send({
      error: true,
      mensaje: "el campo nombre no deberia estar vacio y debe ser Cadena"
    });
  } else {
    try {
      // subir imagen
      if (req.file) {
        console.log(req.file.filename);
        req.body.imagen = req.file.filename;
      } // guardar


      let data = await _models.default.Producto.create(req.body); // responder

      res.json({
        mensaje: "Producto Registrada",
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

const mostrar = function (req, res) {};

exports.mostrar = mostrar;

const modificar = function (req, res) {};

exports.modificar = modificar;

const eliminar = function (req, res) {};

exports.eliminar = eliminar;