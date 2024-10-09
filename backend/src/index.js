// index.js
const app = require('./app');  // Importa la configuración de la aplicación

// Iniciar el servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});
