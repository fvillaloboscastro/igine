export interface Paciente {
  nombre:string;
  rut: string;
  ano: number | null;  // Permitir null
  prevision: string;
  estadocivil: string;
  celular: string | null;  // Permitir null
  correo: string;
}
