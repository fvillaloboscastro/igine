const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true } // Añade la sal al modelo
});

module.exports = mongoose.model("UserModel", userSchema);


