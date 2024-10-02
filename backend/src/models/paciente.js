const { Schema, model } = require('mongoose');

// Definir el esquema de la ficha ginecológica
const fichaGinecologicaSchema = new Schema({
  ultimaMenstruacion: { type: Date },
  embarazoActual: { type: Boolean },
  observaciones: { type: String },
}, { _id: false });  // Evitar la creación de _id para cada subdocumento

// Definir el esquema de la ficha de examen
const fichaExamenSchema = new Schema({
  fecha: { type: Date },
  tipoExamen: { type: String },
  resultados: { type: String },
}, { _id: false });

// Definir el esquema de la ficha obstétrica
const fichaObstetricaSchema = new Schema({
  embarazosPrevios: { type: Number },
  partos: { type: Number },
  abortos: { type: Number },
}, { _id: false });

// Definir el esquema de la ficha general
const fichaGeneralSchema = new Schema({
  antecedentes: { type: String },
  alergias: { type: String },
  tratamientos: { type: String },
}, { _id: false });

// Definir el esquema principal del paciente
const pacienteSchema = new Schema({
  nombre: { type: String, required: true },  // Nombre del paciente
  año: { type: Number, required: true },     // Año (como el año de nacimiento)
  prevision: { type: String, required: true },  // Tipo de previsión médica
  celular: { type: String, required: true },    // Número de celular
  estadocivil: { type: String, required: true },  // Estado civil del paciente
  correo: { type: String, required: true },      // Correo electrónico del paciente
  
  // Incluir las fichas médicas como subdocumentos
  fichaGinecologica: fichaGinecologicaSchema,
  fichaExamen: fichaExamenSchema,
  fichaObstetrica: fichaObstetricaSchema,
  fichaGeneral: fichaGeneralSchema

}, {
  timestamps: true,  // Añadir campos createdAt y updatedAt automáticamente
  versionKey: false  // Desactivar el campo de versión "__v"
});

// Crear y exportar el modelo 'Paciente'
module.exports = model('Paciente', pacienteSchema);
