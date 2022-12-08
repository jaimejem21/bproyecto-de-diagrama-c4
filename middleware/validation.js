const express = require('express');
const { validationResult } = require("express-validator");
const Usuario = require("../model/Usuario");

const express_validation = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    return next();
}

const UniqueEmail = async (value) => {

    let user = await Usuario.find({ email: value });

    if (user.length > 0) {
        return Promise.reject('email ya esta registrado!!!')
    }

    return true;
}

module.exports = {
    express_validation,
    UniqueEmail
}