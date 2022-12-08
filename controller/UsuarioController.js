const { request, response } = require("express");
const bcrypt = require("bcrypt");

const Usuario = require("../model/Usuario");
const { isValidObjectId } = require("mongoose");

const createUser = async (req = request, res = response) => {

    const { password } = req.body;
    const user = new Usuario(req.body);

    // Hash
    let salt = bcrypt.genSaltSync();
    let hash = bcrypt.hashSync(password, salt);
    user.password = hash;

    try {

        await user.save();

    } catch (err) {

        console.log("error createUser")
        return res.status(500).json({
            ok: false,
            message: "Error al create el user"
        })
    }

    res.status(201).json({
        ok: true,
        message: "Se creo el usuario coorrectamente",
        data: user
    });

}

const loginUser = async (req = request, res = response) => {

    const { email, password } = req.body;

    let user = await Usuario.findOne({ email: email }).exec();

    if (!user) {
        return res.status(404).json({
            ok: false,
            message: "email no encontrado!!!"
        });
    }

    // Validate password
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({
            ok: false,
            message: "password incorrecto"
        });
    }

    return res.status(200).json({
        ok: true,
        message: "login correcto !!!",
        data: user
    });

}


const getOneUser = async (req = request, res = response) => {

    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({
            ok: false,
            message: "error required ObjectId"
        });
    }

    let usuario = null;

    try {
        usuario = await Usuario.findById(id).exec();
    } catch (err) {

        console.log("error getOneUser");

        return res.status(500).json({
            ok: false,
            message: "error en el server getOneUser"
        });
    }

    if (!usuario) {
        return res.status(400).json({
            ok: false,
            message: "No se encontro al usuario"
        });
    }

    return res.status(200).json({
        ok: true,
        message: "Usuario correcto!!!",
        data: usuario
    });

}

module.exports = {
    createUser,
    loginUser,
    getOneUser
}