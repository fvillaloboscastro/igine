import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';  // Importa el servicio del paciente
import { Paciente } from 'src/app/models/paciente';  // Asegúrate de tener el modelo de Paciente

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  // Definir el objeto paciente para enlazar con el formulario
  paciente: Paciente = {
    nombre:'',
    rut: '',
    ano: null,
    prevision: '',
    estadocivil: '',
    celular: null,
    correo: ''
  };

  constructor(private pacienteService: PacienteService) { }

  ngOnInit(): void {
    // Inicializar si es necesario
  }

  // Método para guardar los datos del paciente
  guardarPaciente() {
    this.pacienteService.guardarPaciente(this.paciente).subscribe(
      res => {
        console.log('Paciente guardado exitosamente:', res);
        alert('Paciente guardado correctamente');
        this.limpiarFormulario();  // Limpiar el formulario después de guardar
      },
      err => {
        console.error('Error al guardar el paciente', err);
      }
    );
  }

  // Método para limpiar el formulario después de guardar
  limpiarFormulario() {
    this.paciente = {
      nombre:'',
      rut: '',
      ano: null,
      prevision: '',
      estadocivil: '',
      celular: null,
      correo: ''
    };
  }
}
