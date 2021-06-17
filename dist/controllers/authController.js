"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registroUsuario2 = exports.registroUsuario = exports.ingresar2 = exports.ingresar = void 0;

var _models = _interopRequireWildcard(require("./../models"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("./../config/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import * as config from "./../config/config"
var BCRYPT_SALT_ROUNDS = 12;
/**
 * Permite autenticarme
 * @param {*} req petición cliente
 * @param {*} res respuesta servidor
 */

const ingresar = function (req, res) {
  // select * from usuarios where email = req.body.email
  //sequelize.query(`select * from usuarios where email = ${req.body.email}`)
  _models.default.Usuario.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    console.log(user);

    if (!user) {
      res.json({
        mensaje: "El Usuario no existe",
        error: true
      });
    } else {
      if (req.body.password == user.password) {
        res.json({
          mensaje: "Bienvenido",
          data: user,
          error: false
        });
      } else {
        res.json({
          mensaje: "Contraseña incorrecta",
          error: true
        });
      }
    }
  }).catch(error => {
    console.log(error);
    res.json({
      mensaje: "Error al authenticar",
      error: true
    });
  }); // logica 
  //res.json({mensaje: "Bienvenido usuario", error: false});

}; // async await


exports.ingresar = ingresar;

const ingresar2 = async function (req, res) {
  try {
    let user = await _models.default.Usuario.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user) {
      res.json({
        mensaje: "El Usuario no existe",
        error: true
      });
    } else {
      let verif = await _bcrypt.default.compare(req.body.password, user.password);

      if (verif) {
        // generar el token (jwt)
        const payload = {
          correo: user.email,
          id: user.id,
          time: new Date(),
          tiempo_expiracion: _config.tiempo_expiracion
        };

        let token = _jsonwebtoken.default.sign(payload, _config.codigo_secreto, {
          expiresIn: _config.tiempo_expiracion
        });

        res.json({
          usuario: payload,
          token: token,
          error: false
        });
      } else {
        res.json({
          mensaje: "Contraseña incorrecta",
          error: true
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      mensaje: "Error al authenticar",
      error: true
    });
  }
};
/**
 * Registro de un nuevo Usuario
 * @param {*} req 
 * @param {*} res 
 */


exports.ingresar2 = ingresar2;

const registroUsuario = function (req, res) {
  console.log(req.body); // insert into usuarios (email, password) values ('')

  _models.default.Usuario.create(req.body).then(user => {
    res.json({
      mensaje: "Usuario Registrado",
      error: false
    });
  }).catch(error => {
    console.log(error);
    res.json({
      mensaje: "Error al registrar el usuario",
      error: true
    });
  });
};

exports.registroUsuario = registroUsuario;

const registroUsuario2 = async function (req, res) {
  // validar
  try {
    let hashedPassword = await _bcrypt.default.hash(req.body.password, BCRYPT_SALT_ROUNDS);
    req.body.password = hashedPassword;
    console.log("********* ", hashedPassword);
    let user = await _models.default.Usuario.findOne({
      where: {
        email: req.body.email
      }
    });

    if (user) {
      res.json({
        mensaje: "El correo ya está registrado",
        error: true
      });
    } else {
      let user = await _models.default.Usuario.create(req.body);
      console.log(user);
      res.json({
        mensaje: "Usuario Registrado",
        dato: user,
        error: false
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      mensaje: "Error al registrar el usuario",
      error: true
    });
  }
};

exports.registroUsuario2 = registroUsuario2;