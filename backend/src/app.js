// app.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

// Configurar el puerto
app.set('port', process.env.PORT || 3000);  // Aquí configuramos el puerto

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));  // Procesa datos de formularios HTML o URL-encoded

// Rutas
app.use('/api/pacientes', require('./routes/pacientes.routes'));

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('El servidor Express está funcionando');
});

module.exports = app;
