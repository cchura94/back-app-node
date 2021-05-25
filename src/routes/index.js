import express from "express";
let router = express.Router();
import {verificaAuth} from "./../middlewares/authMiddleware"

import * as authController from "./../controllers/authController.js"



// Rutas Autenticación
router.post("/auth/login", authController.ingresar);
router.post("/auth/login2", authController.ingresar2);

router.post("/registro", verificaAuth, authController.registroUsuario2);


// module.exports = router;
export default router;