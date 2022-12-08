const { request, response } = require("express");
const { isValidObjectId } = require("mongoose");
const Sala = require("../model/Sala");


const createSala = async (req = request, res = response) => {

    const { anfitrion } = req.body;

    if (!isValidObjectId(anfitrion)) {
        return res.status(400).json({
            ok: false,
            message: "error anfitrion required ObjectId"
        });
    }

    const sala = new Sala(req.body);

    try {
        await sala.save();
    } catch (err) {
        console.log("error createSala");
        return res.status(500).json({
            ok: false,
            message: "error en el server create sala"
        });
    }

    return res.status(200).json({
        ok: true,
        message: "Se creo la sala correctamente",
        data: sala
    });
}

const deleteSala = async (req = request, res = response) => {

    const { anfitrion } = req.body;
    const { idSala } = req.params;

    if (!isValidObjectId(anfitrion) || !isValidObjectId(idSala)) {
        return res.status(400).json({
            ok: false,
            message: "error required ObjectId"
        });
    }

    let sala = await Sala.findById(idSala).exec();

    if (!sala) {
        return res.status(404).json({
            ok: false,
            message: "error id sala no existe!!!"
        });
    }

    if (sala.anfitrion != anfitrion) {
        return res.status(401).json({
            ok: false,
            message: "error no tiene permisos para eliminar"
        });
    }

    try {
        await sala.remove();
    } catch (err) {
        console.log("error deleteSala");
        return res.status(500).json({
            ok: false,
            message: "error en el server delete sala"
        });
    }

    return res.status(201).json({
        ok: true,
        message: "se elimino la sala correctamente",
        data: sala
    });
}

const getListSala = async (req = request, res = response) => {

    const { idUser } = req.params;

    if (!isValidObjectId(idUser)) {
        return res.status(400).json({
            ok: false,
            message: "error required ObjectId"
        });
    }

    let salas = [];

    try {

        salas = await Sala.find({ anfitrion: idUser }).exec();

    } catch (err) {
        console.log("error listarsalas");
        return res.status(500).json({
            ok: false,
            message: "error en el server list sala"
        });
    }

    return res.status(200).json({
        ok: true,
        message: "se realizo la busqueda correctamente",
        data: salas
    });

}

const updateActiveSala = async (req = request, res = response) => {

    const { anfitrion, active } = req.body;
    const { idSala } = req.params;

    if (!isValidObjectId(anfitrion) || !isValidObjectId(idSala)) {
        return res.status(400).json({
            ok: false,
            message: "error required ObjectId"
        });
    }

    let sala = await Sala.findById(idSala).exec();

    if (!sala) {
        return res.status(404).json({
            ok: false,
            message: "error id sala no existe!!!"
        });
    }

    if (sala.anfitrion != anfitrion) {
        return res.status(401).json({
            ok: false,
            message: "error no tiene permisos para updateActiveSala"
        });
    }

    try {

        sala.active = active;
        await sala.save();

    } catch (err) {

        console.log("error activeSala");

        return res.status(500).json({
            ok: false,
            message: "error en el server updateActiveSala"
        });

    }

    return res.status(201).json({
        ok: true,
        message: "se actualizo active sala",
        data: sala
    });

}

const getOneSala = async (req = request, res = response) => {

    const { idSala } = req.params;


    if (!isValidObjectId(idSala)) {
        return res.status(400).json({
            ok: false,
            message: "error required ObjectId"
        });
    }

    let salaSearch = null;

    try {
        salaSearch = await Sala.findById(idSala).exec();
    } catch (err) {

        console.log("error getOneSala");

        return res.status(500).json({
            ok: false,
            message: "error en el server getOneSala"
        });
    }

    if (!salaSearch) {
        return res.status(404).json({
            ok: false,
            message: "no se encontro la sala",
        });
    }


    return res.status(200).json({
        ok: true,
        message: "Se ecnontro la sala",
        data: salaSearch
    });

}

const setUserSala = async (req = request, res = response) => {

    const { idSala } = req.params;
    const { idUser } = req.body;

    if (!isValidObjectId(idUser) || !isValidObjectId(idSala)) {

        return res.status(400).json({
            ok: false,
            message: "error required ObjectId"
        });

    }

    let sala = null;

    try {
        sala = await Sala.findById(idSala).exec();
    } catch (error) {
        console.log("error setUserSala");

        return res.status(500).json({
            ok: false,
            message: "error en el server setUserSala"
        });
    }

    if (!sala) {
        return res.status(404).json({
            ok: false,
            message: "no se encontro la sala",
        });
    }

    sala.usuarios.push(idUser);

    await sala.save();

    return res.status(201).json({
        ok: true,
        message: "Se agrego el usuario correctamente"
    });

}

const resetSala = async (req = request, res = response) => {

    const { idSala } = req.params;

    if (!isValidObjectId(idSala)) {
        return res.status(400).json({
            ok: false,
            message: "error required ObjectId"
        });
    }

    let sala = null;

    try {
        sala = await Sala.findById(idSala).exec();
    } catch (error) {
        console.log("error resetSala");

        return res.status(500).json({
            ok: false,
            message: "error en el server resetSala"
        });
    }

    if (!sala) {
        return res.status(404).json({
            ok: false,
            message: "no se encontro la sala",
        });
    }

    sala.active = false;
    sala.usuarios = [];

    try {
        await sala.save();
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "error en el server resetSala"
        });
    }

    return res.status(201).json({
        ok: true,
        message: "La sala finalizo correctamente"
    });

}

const setDataSalaBoard = async (req = request, res = response) => {

    const { idSala } = req.params;
    const { board, links } = req.body;

    if (!isValidObjectId(idSala)) {
        return res.status(400).json({
            ok: false,
            message: "error required ObjectId"
        });
    }

    let sala = null;

    try {
        sala = await Sala.findById(idSala).exec();
    } catch (error) {
        console.log("error setDataSalaBoard");

        return res.status(500).json({
            ok: false,
            message: "error en el server setDataSalaBoard"
        });
    }

    if (!sala) {
        return res.status(404).json({
            ok: false,
            message: "no se encontro la sala",
        });
    }

    sala.board = board;
    sala.links = links;

    try {

        await sala.save();

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "error en el server setDataSalaBoard Save"
        });
    }

    return res.status(201).json({
        ok: true,
        message: "Los datos en la sala se guardaron correctamente!!!"
    });

}

module.exports = {
    createSala,
    deleteSala,
    getListSala,
    updateActiveSala,
    getOneSala,
    setUserSala,
    resetSala,
    setDataSalaBoard
}