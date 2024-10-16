const express = require('express');
const router = express.Router();
const pacienteCtrl = require('../controllers/pacienteController');

// Actualizar la ficha ginecológica
router.put('/pacientes/:id/ficha-ginecologica', pacienteCtrl.editFichaGinecologica);

// Actualizar la ficha obstétrica
router.put('/pacientes/:id/ficha-obstetrica', pacienteCtrl.editFichaObstetrica);

// Actualizar la ficha general
router.put('/pacientes/:id/ficha-general', pacienteCtrl.editFichaGeneral);

// Actualizar la ficha de examen
router.put('/pacientes/:id/ficha-examen', pacienteCtrl.editFichaExamen);

module.exports = router;
