const { model, Schema, SchemaTypes } = require("mongoose");

const SalaSchema = new Schema({

    name: {
        required: true,
        type: SchemaTypes.String,
    },
    anfitrion: {
        type: SchemaTypes.ObjectId,
        ref: "usuarios"
    },
    active: {
        type: SchemaTypes.Boolean,
        default: false
    },
    board: {
        type: SchemaTypes.String,
        default: ""
    },
    usuarios: {
        type: [SchemaTypes.String],
        default: []
    },
    links: {
        type: SchemaTypes.Array,
        default: []
    }
    
});

module.exports = model("salas", SalaSchema);