"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verificaAuth = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("./../config/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const verificaAuth = async (req, res, next) => {
  let token = null;

  if (req.headers.authorization) {
    // Bearer abc.def.xyz
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(403).send({
      mensaje: 'No se proporcionó el token de seguridad',
      error: true
    });
  } // Verificar si el token es correcto


  _jsonwebtoken.default.verify(token, _config.codigo_secreto, (error, decoded) => {
    if (error) {
      res.status(500).send({
        mensaje: "Error de Autenticación",
        error: true
      });
    }

    next();
  });
};

exports.verificaAuth = verificaAuth;