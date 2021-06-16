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

router.post("/registro", authController.registroUsuario2);

// rutas de Categoria
router.get("/categoria", catController.lista);
router.post("/categoria", catController.guardar);
router.put("/categoria/:id", catController.modificar);
router.delete("/categoria/:id", catController.eliminar);

// Rutas de Proveedor
router.get("/proveedor", provController.lista);
router.post("/proveedor", provController.guardar);
router.put("/proveedor/:id", provController.modificar);
router.delete("/proveedor/:id", provController.eliminar);

// Rutas Para Producto
router.get("/producto", verificaAuth,prodController.lista);
router.post("/producto", upload.single("imagen"), prodController.guardar);
router.get("/producto/:id", prodController.mostrar);
router.put("/producto/:id", prodController.modificar);
router.delete("/producto/:id", prodController.eliminar);

// Cliente
router.get("/cliente", clieController.lista)
router.post("/cliente", clieController.guardar)
router.put("/cliente/:id", clieController.modificar);
router.delete("/cliente/:id", clieController.eliminar);

// Pedido
router.get("/pedido", pedController.lista)
router.post("/pedido", pedController.guardar)
router.put("/pedido/:id", pedController.modificar);
router.delete("/pedido/:id", pedController.eliminar);
// module.exports = router;
export default router;