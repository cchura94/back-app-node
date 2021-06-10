import express from "express";
let router = express.Router();
import {verificaAuth} from "./../middlewares/authMiddleware"

import * as authController from "./../controllers/authController.js"
import * as catController  from "./../controllers/categoriaController"

import * as provController  from "./../controllers/proveedorController"

// Rutas Autenticación
router.post("/auth/login", authController.ingresar);
router.post("/auth/login2", authController.ingresar2);

router.post("/registro", verificaAuth, authController.registroUsuario2);

// rutas de Categoria
router.get("/categoria", catController.lista);
router.post("/categoria", catController.guardar);
router.delete("/categoria/:id", catController.eliminar);

// Rutas de Proveedor
router.get("/proveedor", provController.lista);
router.post("/proveedor", provController.guardar);
router.delete("/proveedor/:id", provController.eliminar);

// module.exports = router;
export default router;