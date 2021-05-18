// importar dependencias npm (express)
import express from "express"

// Variables 
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
// configuracion de dependencias
let app = express();

app.set("puerto", PORT);
app.set("host", HOST);

// rutas
app.get("/test", (req, res) => {
    res.send("Hola Bienvenido a mi Página con Node.js");
});

// levantar el servidor
app.listen(app.get("puerto"), app.get("host"), () => {
    console.log(`Servidor levantado en http://${app.get("host")}:${app.get("puerto")}`);
})