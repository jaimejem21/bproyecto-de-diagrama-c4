const mongoose = require('mongoose');


const conexion = async () => {
    try {
        mongoose.connect(process.env.DB_HOST);
        console.log("DB Up");
    } catch (error) {
        console.log("Error DB down");
    }
}

module.exports = {
    conexion
}