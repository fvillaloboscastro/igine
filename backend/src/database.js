// database.js

const mongoose = require("mongoose");

// Conectar a MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://villadelobos:123qweasd@gine.copjd.mongodb.net/mi-base-datos?w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

module.exports = mongoose;
