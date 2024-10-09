export interface Paciente {
    _id: string;               // ID único del paciente
    nombre: string;            // Nombre del paciente
    año: number;               // Año de nacimiento 
    prevision: string;         // Tipo de previsión médica (Fonasa, Isapre, etc.)
    celular: string;           // Número de celular
    estadocivil: string;       // Estado civil (Soltero, Casado, etc.)
    correo: string;            // Correo electrónico del paciente

  }
  