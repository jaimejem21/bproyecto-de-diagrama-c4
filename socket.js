const { Server } = require("socket.io");
const { findSala } = require('./controller/SocketController');

class Socket {

    constructor(server) {
        this.io = new Server(server)
        this.onServer();
    }

    onServer() {
        this.io.on("connection", (socket) => {

            const { idsocket } = socket.handshake.query;
            socket.join(idsocket);

            socket.on('solicitud-sala', async (args) => {

                const { idSala, nameUser, idUser } = args;

                let res = await findSala(idSala);

                if (!res.ok) {
                    socket.emit('respuesta-solicitud', {
                        active: false,
                        denegado: true,
                        idSala
                    });
                    return;
                }

                let { anfitrion, active } = res.data;

                if (!active) {
                    socket.emit('respuesta-solicitud', {
                        active: false,
                        denegado: true,
                        idSala
                    });
                    return;
                }

                //Enviarle solicitud al anfirtrion
                this.io.to(anfitrion.toString()).emit("solicitud-anfitrion", {
                    idUser,
                    message: `El usuario:${nameUser} quiere ingresar a la sala:${idSala}`,
                    idSala
                });

            });

            socket.on("solicitud-aceptada", (args) => {

                const { idUser, idSala } = args;

                this.io.to(idUser).emit("respuesta-solicitud", {
                    active: true,
                    denegado: false,
                    idSala
                });

            });

            socket.on("solicitud-denegada", (args) => {

                const { idUser, idSala } = args;

                this.io.to(idUser).emit("respuesta-solicitud", {
                    active: true,
                    denegado: true,
                    idSala
                });

            });

            socket.on("agregar-sala", (args) => {
                const { idSala } = args;
                socket.join(idSala);
            });

            socket.on("finalizar-sala", (args) => {
                const { idSala } = args;
                this.io.to(idSala).emit("close-sala", { idSala })
            });

            socket.on("leave-sala", (args) => {
                const { idSala } = args;
                socket.leave(idSala);
            });

            socket.on("draw-figure", (args) => {
                const { idsala, element, params, idElement } = args;
                socket.broadcast.to(idsala).emit("draw-figure-sala", { element, params, idElement });
            });

            socket.on("borrar-board", (args) => {
                const { idSala } = args;
                socket.broadcast.to(idSala).emit("borrar-board-client");
            })

            socket.on("eliminar-element", (args) => {
                const { idsala, idElement } = args;
                socket.broadcast.to(idsala).emit("eliminar-element-client", { idElement });
            })

            socket.on("disconnect", (reason) => {
                socket.leave(idsocket);
            });

        })
    }
}

module.exports = Socket;