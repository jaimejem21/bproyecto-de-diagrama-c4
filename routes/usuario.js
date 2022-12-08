const express = require("express");
const { check } = require("express-validator");
const { createUser, loginUser, getOneUser } = require('../controller/UsuarioController');
const { express_validation, UniqueEmail } = require("../middleware/validation");

const router = express.Router();

/*
    path:'/user
*/

router.post('/create', [
    check('name', 'name invalido').isLength({ min: 2 }),
    check('password', 'password invalido').isLength({ min: 8 }),
    check('email', 'email invalido').isEmail().custom(UniqueEmail),
    express_validation
], createUser);

router.post('/login', [
    check('email', 'email invalido').isEmail(),
    check('password', 'password invalido').isLength({ min: 8 }),
    express_validation
], loginUser);

router.get('/getOne/:id', getOneUser);

module.exports = router;