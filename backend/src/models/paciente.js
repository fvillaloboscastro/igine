const { Schema, model } = require('mongoose');

// Definir el esquema de la ficha ginecológica
const fichaGinecologicaSchema = new Schema({
  fur: { type: String },  // F.U.R (Fecha de última menstruación)
  furOperacional: { type: String },  // F.U.R Operacional
  asignacionFamiliar: { type: String },  // Asignación Familiar
  fechaLicenciaMaternal: { type: String },  // Fecha de Licencia Maternal
  fechaPartoProbable: { type: String },  // Fecha probable de parto
  fecha: { type: String },  // Fecha del control o consulta
  eg: { type: String },  // Edad gestacional (E.G)
  peso: { type: String },  // Peso de la paciente
  au: { type: String },  // Altura uterina
  lof: { type: String },  // Latidos fetales
  mfet: { type: String },  // Movimiento fetal
  sistole: { type: String },  // Presión sistólica
  diastole: { type: String },  // Presión diastólica
  detallesAdicionales: { type: String }  // Observaciones o detalles adicionales
}, { _id: false });  // Evitar la creación de _id para este subdocumento

// Definir el esquema de la ficha de examen
const fichaExamenSchema = new Schema({
  fecha: { type: Date, required: true },  // Fecha del examen
  campo1: { type: String },  // Placeholder, reemplaza con los nombres reales de los campos
  campo2: { type: String },
  campo3: { type: String },
  campo4: { type: String },
  campo5: { type: String },
  campo6: { type: String },
  campo7: { type: String },
  campo8: { type: String },
  detallesAdicionales: { type: String }  // Observaciones adicionales
}, { _id: false });

const fichaObstetricaSchema = new Schema({
  fechaultimoPAP: { type: String },  // Fecha del último PAP
  pap: { type: String },  // Resultado del PAP
  papTomado: { type: String },  // PAP tomado
  cirugiaPendiente: { type: String },  // Cirugía pendiente
  gesta: { type: String },  // Gesta (número de embarazos)
  para: { type: String },  // Para (número de partos)
  abortos: { type: String },  // Abortos
  detallesAdicionales: { type: String }  // Observaciones adicionales
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
