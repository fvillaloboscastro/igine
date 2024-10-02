const pacienteCtrl = {};


const paciente = require('../models/paciente')

// Obtener todos los pacientes
pacienteCtrl.getPacientes = async (req, res) => {
  const pacientes = await Paciente.find();  // Encuentra todos los pacientes
  res.json(pacientes);  // Enviar los pacientes como respuesta en formato JSON
};

// Crear un nuevo paciente
pacienteCtrl.createPaciente = async (req, res) => {
  const newPaciente = new Paciente(req.body);  // Crear un nuevo paciente con los datos del cuerpo de la solicitud
  await newPaciente.save();  // Guardar el nuevo paciente en la base de datos
  res.send({ message: 'Paciente Creado' });  // Respuesta de éxito
};

// Obtener un paciente por ID
pacienteCtrl.getPaciente = async (req, res) => {
  const paciente = await Paciente.findById(req.params.id);  // Busca al paciente por su ID
  res.send(paciente);  // Envía el paciente encontrado como respuesta
};

// Editar un paciente por ID
pacienteCtrl.editPaciente = async (req, res) => {
  await Paciente.findByIdAndUpdate(req.params.id, req.body);  // Actualiza el paciente con los datos del cuerpo de la solicitud
  res.json({ status: 'Paciente Actualizado' });  // Respuesta de éxito
};

// Eliminar un paciente por ID
pacienteCtrl.deletePaciente = async (req, res) => {
  await Paciente.findByIdAndDelete(req.params.id);  // Elimina el paciente por su ID
  res.json({ status: 'Paciente Eliminado' });  // Respuesta de éxito
};

// Exportamos el controlador de paciente
module.exports = pacienteCtrl;