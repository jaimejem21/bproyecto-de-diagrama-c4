const { model, Schema, SchemaTypes } = require("mongoose");

const UsuarioSchema = new Schema({
    name: {
        required: true,
        type: SchemaTypes.String
    },
    email: {
        required: true,
        type: SchemaTypes.String,
        unique: true
    },
    password: {
        required: true,
        type: SchemaTypes.String
    }
});

module.exports = model('usuarios', UsuarioSchema);