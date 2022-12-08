const express = require("express");
const { check } = require("express-validator");
const { express_validation } = require("../middleware/validation");
const {
    createSala,
    deleteSala,
    getListSala,
    updateActiveSala,
    getOneSala,
    setUserSala,
    resetSala,
    setDataSalaBoard
} = require("../controller/SalaController")

const router = express.Router();

router.post('/create', [
    check('name', 'name invalido').isLength({ min: 2 }),
    check('anfitrion', 'anfitrion invalido').exists(),
    express_validation
], createSala);

router.delete('/delete/:idSala', [
    check('anfitrion', 'anfitrion invalido').exists(),
    express_validation
], deleteSala);

router.get('/list/:idUser', getListSala);

router.get('/getOne/:idSala', getOneSala);

router.put('/active/:idSala', [
    check('anfitrion', 'anfitrion invalido').exists(),
    check('active', 'active invalido').isBoolean(),
    express_validation
], updateActiveSala);

router.put('/setUsuario/:idSala', [
    check('idUser', 'Usuario invalido').exists(),
    express_validation
], setUserSala);

router.get('/finalize/:idSala', resetSala);

router.post('/setData/:idSala', [
    check('board', 'Data no encontrado').exists(),
    check('links', 'Dato no ecnontrado').exists(),
    express_validation
], setDataSalaBoard);


module.exports = router;