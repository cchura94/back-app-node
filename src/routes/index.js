import express from "express";
let router = express.Router();
import {verificaAuth} from "./../middlewares/authMiddleware"
// Para subir imagenes o Archivos
import multer from "multer"
// var upload = multer({ dest: 'public/' })

import * as authController from "./../controllers/authController.js"
import * as catController  from "./../controllers/categoriaController"

import * as provController  from "./../controllers/proveedorController"
import * as prodController  from "./../controllers/productoController"
import * as clieController  from "./../controllers/clienteController"
import * as pedController  from "./../controllers/pedidoController"

// Cofiguración multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/imagenes')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'-'+file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

// Rutas Autenticación
router.post("/auth/login", authController.ingresar);
router.post("/auth/login2", authController.ingresar2);

router.post("/registro", verificaAuth,authController.registroUsuario2);

// rutas de Categoria
router.get("/categoria", verificaAuth, catController.lista);
router.post("/categoria", verificaAuth, catController.guardar);
router.put("/categoria/:id", verificaAuth, catController.modificar);
router.delete("/categoria/:id", verificaAuth, catController.eliminar);

// Rutas de Proveedor
router.get("/proveedor", verificaAuth, provController.lista);
router.post("/proveedor", verificaAuth, provController.guardar);
router.put("/proveedor/:id", verificaAuth, provController.modificar);
router.delete("/proveedor/:id", verificaAuth, provController.eliminar);

// Rutas Para Producto
router.get("/producto", verificaAuth, prodController.lista);
router.post("/producto", verificaAuth, upload.single("imagen"), prodController.guardar);
router.get("/producto/:id", verificaAuth, prodController.mostrar);
router.put("/producto/:id", verificaAuth, prodController.modificar);
router.delete("/producto/:id", verificaAuth, prodController.eliminar);

// Cliente
router.get("/cliente", verificaAuth, clieController.lista)
router.post("/cliente", verificaAuth, clieController.guardar)
router.put("/cliente/:id", verificaAuth, clieController.modificar);
router.delete("/cliente/:id", verificaAuth, clieController.eliminar);

// Pedido
router.get("/pedido", verificaAuth, pedController.lista)
router.post("/pedido", verificaAuth, pedController.guardar)
router.put("/pedido/:id", verificaAuth, pedController.modificar);
router.delete("/pedido/:id", verificaAuth, pedController.eliminar);

router.get("/verifica", verificaAuth, function(req, res){
    res.status(200).send({
      mensaje: "Auth",
      error: false
  })
});
// module.exports = router;
export default router;