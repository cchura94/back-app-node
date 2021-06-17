"use strict";

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("./routes/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// importar dependencias npm (express)
// Variables 
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0'; // configuracion de dependencias

let app = (0, _express.default)();
app.set("puerto", PORT);
app.set("host", HOST); // Para vuejs e imagenes

app.use(_express.default.static('public')); // json (req.body)

app.use(_express.default.json()); // for parsing application/json

app.use(_express.default.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
// CORS

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'content-type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
}); // config rutas

app.use("/api", _index.default); // rutas

app.get("/test", (req, res) => {
  res.send("Hola Bienvenido a mi Página con Node.js");
});
app.get("/", (req, res) => {
  res.send("Saludos Humanos-!!");
}); // levantar el servidor

app.listen(app.get("puerto"), app.get("host"), () => {
  console.log(`Servidor levantado en http://${app.get("host")}:${app.get("puerto")}`);
});