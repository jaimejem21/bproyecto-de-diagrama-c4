const express = require("express");
const http = require("http");
const Socket = require("./socket");
const usuario = require("./routes/usuario");
const sala = require("./routes/sala");
const cors = require("cors");


class Servidor {

    constructor() {
        this.port = process.env.PORT;
        this.app = express();
        this.server = http.createServer(this.app);
    }

    middleware() {

        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(express.json());

        /* --------------------------------- routes --------------------------------- */
        this.app.use("/user", usuario);
        this.app.use("/sala", sala);

    }

    ServerSocket() {
        new Socket(this.server)
    }

    execute() {

        this.middleware();

        this.ServerSocket();

        this.server.listen(this.port, () => {
            console.log("Server UP !!!");
        });
    }

}

module.exports = Servidor;