import express from "express";
let router = express.Router();

import * as authController from "./../controllers/authController.js"



// Rutas Autenticación
router.post("/auth/login", authController.ingresar);
router.post("/registro", authController.registroUsuario);


// module.exports = router;
export default router;