"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _authMiddleware = require("./../middlewares/authMiddleware");

var _multer = _interopRequireDefault(require("multer"));

var authController = _interopRequireWildcard(require("./../controllers/authController.js"));

var catController = _interopRequireWildcard(require("./../controllers/categoriaController"));

var provController = _interopRequireWildcard(require("./../controllers/proveedorController"));

var prodController = _interopRequireWildcard(require("./../controllers/productoController"));

var clieController = _interopRequireWildcard(require("./../controllers/clienteController"));

var pedController = _interopRequireWildcard(require("./../controllers/pedidoController"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = _express.default.Router();

// Cofiguración multer
var storage = _multer.default.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/imagenes');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

var upload = (0, _multer.default)({
  storage: storage
}); // Rutas Autenticación

router.post("/auth/login", authController.ingresar);
router.post("/auth/login2", authController.ingresar2);
router.post("/registro", _authMiddleware.verificaAuth, authController.registroUsuario2); // rutas de Categoria

router.get("/categoria", _authMiddleware.verificaAuth, catController.lista);
router.post("/categoria", _authMiddleware.verificaAuth, catController.guardar);
router.put("/categoria/:id", _authMiddleware.verificaAuth, catController.modificar);
router.delete("/categoria/:id", _authMiddleware.verificaAuth, catController.eliminar); // Rutas de Proveedor

router.get("/proveedor", _authMiddleware.verificaAuth, provController.lista);
router.post("/proveedor", _authMiddleware.verificaAuth, provController.guardar);
router.put("/proveedor/:id", _authMiddleware.verificaAuth, provController.modificar);
router.delete("/proveedor/:id", _authMiddleware.verificaAuth, provController.eliminar); // Rutas Para Producto

router.get("/producto", _authMiddleware.verificaAuth, prodController.lista);
router.post("/producto", _authMiddleware.verificaAuth, upload.single("imagen"), prodController.guardar);
router.get("/producto/:id", _authMiddleware.verificaAuth, prodController.mostrar);
router.put("/producto/:id", _authMiddleware.verificaAuth, prodController.modificar);
router.delete("/producto/:id", _authMiddleware.verificaAuth, prodController.eliminar); // Cliente

router.get("/cliente", _authMiddleware.verificaAuth, clieController.lista);
router.post("/cliente", _authMiddleware.verificaAuth, clieController.guardar);
router.put("/cliente/:id", _authMiddleware.verificaAuth, clieController.modificar);
router.delete("/cliente/:id", _authMiddleware.verificaAuth, clieController.eliminar); // Pedido

router.get("/pedido", _authMiddleware.verificaAuth, pedController.lista);
router.post("/pedido", _authMiddleware.verificaAuth, pedController.guardar);
router.put("/pedido/:id", _authMiddleware.verificaAuth, pedController.modificar);
router.delete("/pedido/:id", _authMiddleware.verificaAuth, pedController.eliminar);
router.get("/verifica", _authMiddleware.verificaAuth, function (req, res) {
  res.status(200).send({
    mensaje: "Auth",
    error: false
  });
}); // module.exports = router;

var _default = router;
exports.default = _default;