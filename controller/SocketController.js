const Sala = require('../model/Sala');
const { isValidObjectId } = require("mongoose");

const findSala = async (idSala) => {

    if (!isValidObjectId(idSala)) {
        return {
            ok: false,
            errors: "ObjectId invalido"
        }
    }

    let sala = null;

    try {
        sala = await Sala.findById(idSala).exec();
    } catch (errr) {
        return {
            ok: false,
            errors: "Error Server"
        }
    }

    if (!sala) {
        return {
            ok: false,
            errors: "Sala no encontrada"
        }
    }

    return {
        ok: true,
        data: sala
    }

}

module.exports = {
    findSala
}