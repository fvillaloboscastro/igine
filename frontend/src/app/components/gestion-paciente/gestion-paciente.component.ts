import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-paciente',
  templateUrl: './gestion-paciente.component.html',
  styleUrls: ['./gestion-paciente.component.css']
})
export class BuscarAgregarPacienteComponent {
  nombrePaciente: string = '';        // Nombre para buscar un paciente
  nombreNuevoPaciente: string = '';   // Nombre para agregar un nuevo paciente

  constructor(private http: HttpClient, private router: Router) {}

  // Método para buscar un paciente
  buscarPaciente() {
    if (this.nombrePaciente.trim()) {
      this.http.get(`http://localhost:3000/api/pacientes?nombre=${this.nombrePaciente}`)
        .subscribe((paciente: any) => {
          if (paciente) {
            console.log('Paciente encontrado:', paciente);
            // Redirigir a la vista del paciente para cargar sus fichas
            this.router.navigate([`/paciente/${paciente._id}`]);
          } else {
            console.error('Paciente no encontrado');
          }
        }, error => {
          console.error('Error buscando el paciente', error);
        });
    }
  }

  // Método para agregar un nuevo paciente
  agregarPaciente() {
    if (this.nombreNuevoPaciente.trim()) {
      const nuevoPaciente = {
        nombre: this.nombreNuevoPaciente,
        fichaGinecologica: {},
        fichaObstetrica: {},
        fichaExamen: {}
      };

      this.http.post('http://localhost:3000/api/pacientes', nuevoPaciente)
        .subscribe((pacienteCreado: any) => {
          console.log('Nuevo paciente creado:', pacienteCreado);
          // Redirigir a la vista del paciente recién creado para llenar las fichas
          this.router.navigate([`/paciente/${pacienteCreado._id}`]);
        }, error => {
          console.error('Error al agregar el paciente', error);
        });
    }
  }
}