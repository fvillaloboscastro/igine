// app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('./database'); // Conectar a MongoDB

const app = express();

// Configurar el puerto
app.set('port', process.env.PORT || 3000);  // Aquí configuramos el puerto

// Middlewares
// Configurar CORS para permitir solicitudes desde http://localhost:4200
app.use(cors({
  origin: 'http://localhost:4200',  // Permite el dominio de tu frontend
  methods: 'GET,POST,PUT,DELETE',   // Métodos HTTP permitidos
  credentials: true                 // Si necesitas enviar cookies o credenciales
}));
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
