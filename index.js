const Servidor = require("./servidor");
const { conexion } = require("./config/Conexion");

//environment var
require('dotenv').config();

//DB
conexion();

//server
const server = new Servidor();

server.execute();
