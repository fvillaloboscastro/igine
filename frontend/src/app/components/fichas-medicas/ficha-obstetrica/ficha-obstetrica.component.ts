import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ficha-obstetrica',
  templateUrl: './ficha-obstetrica.component.html',
  styleUrls: ['./ficha-obstetrica.component.css']
})
export class FichaObstetricaComponent implements OnInit {
  fichaObstetricaForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // Inicializamos el formulario reactivo con los campos correspondientes
    this.fichaObstetricaForm = this.fb.group({
      nombre: ['', Validators.required],
      fechaUltimoPAP: [''],
      pap: [''],
      papTomado: [''],
      cirugiaPendiente: [''],
      gesta: [''],
      para: [''],
      abortos: [''],
      detallesAdicionales: ['']
    });

    // Aquí puedes cargar los datos del paciente si estás editando la ficha existente
    // Ejemplo:
    // this.loadFichaObstetrica();
  }

  // Función para manejar el envío del formulario (guardar o actualizar la ficha)
  onSubmit(): void {
    if (this.fichaObstetricaForm.valid) {
      const fichaData = this.fichaObstetricaForm.value;
      const pacienteId = '123'; // Asume que tienes el ID del paciente (dinámico)

      // Hacer la solicitud PUT para actualizar la ficha obstétrica
      this.http.put(`/api/pacientes/${pacienteId}/ficha-obstetrica`, fichaData)
        .subscribe(response => {
          console.log('Ficha obstétrica actualizada', response);
        }, error => {
          console.error('Error actualizando la ficha obstétrica', error);
        });
    } else {
      console.error('El formulario no es válido');
    }
  }
}
