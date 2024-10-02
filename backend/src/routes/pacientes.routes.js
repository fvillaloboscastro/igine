const { Router } = require('express');
const router = Router();

const pacientesCtrl = require('../controllers/pacientes.controller'); // Importar el controlador de pacientes

// Definir las rutas para las operaciones CRUD de pacientes
router.get('/', pacientesCtrl.getPacientes);  // Obtener todos los pacientes
router.post('/', pacientesCtrl.createPaciente);  // Crear un nuevo paciente
router.get('/:id', pacientesCtrl.getPaciente);  // Obtener un paciente por ID
router.put('/:id', pacientesCtrl.editPaciente);  // Editar un paciente por ID
router.delete('/:id', pacientesCtrl.deletePaciente);  // Eliminar un paciente por ID

module.exports = router;
