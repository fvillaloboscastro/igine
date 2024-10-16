import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // Añadir estas importaciones
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ficha-ginecologica',
  templateUrl: './ficha-ginecologica.component.html',
  styleUrls: ['./ficha-ginecologica.component.css']
})
export class FichaGinecologicaComponent implements OnInit {
  fichaGinecologicaForm!: FormGroup;  // Formulario reactivo para la ficha ginecológica

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // Inicializamos el formulario reactivo con los campos correspondientes
    this.fichaGinecologicaForm = this.fb.group({
      nombre: ['', Validators.required],
      fur: [''],  // Fecha de la última menstruación
      furOperacional: [''],  // F.U.R Operacional
      asignacionFamiliar: [''],  // Asignación Familiar
      fechaLicenciaMaternal: [''],  // Fecha de Licencia Maternal
      fechaPartoProbable: [''],  // Fecha probable de parto
      fecha: [''],  // Fecha del control o consulta
      eg: [''],  // Edad gestacional (E.G)
      peso: [''],  // Peso de la paciente
      au: [''],  // Altura uterina
      lof: [''],  // Latidos fetales
      mfet: [''],  // Movimiento fetal
      sistole: [''],  // Presión sistólica
      diastole: [''],  // Presión diastólica
      detallesAdicionales: ['']  // Observaciones adicionales
    });

    // Aquí puedes cargar los datos del paciente si estás editando la ficha existente
    // Ejemplo:
    // this.loadFichaGinecologica();
  }

  // Función para cargar los datos existentes de la ficha ginecológica de un paciente
  loadFichaGinecologica(): void {
    const pacienteId = '123'; // Reemplaza con el ID real del paciente
    this.http.get(`/api/pacientes/${pacienteId}/ficha-ginecologica`)
      .subscribe((data: any) => {
        // Rellenamos el formulario con los datos recibidos
        this.fichaGinecologicaForm.patchValue(data.fichaGinecologica);
      }, error => {
        console.error('Error al cargar los datos de la ficha ginecológica', error);
      });
  }

  // Función para manejar el envío del formulario (guardar o actualizar la ficha)
  onSubmit(): void {
    if (this.fichaGinecologicaForm.valid) {
      const fichaData = this.fichaGinecologicaForm.value;
      const pacienteId = '123'; // Asume que tienes el ID del paciente (dinámico)

      // Hacer la solicitud PUT para actualizar la ficha ginecológica
      this.http.put(`/api/pacientes/${pacienteId}/ficha-ginecologica`, fichaData)
        .subscribe(response => {
          console.log('Ficha ginecológica actualizada', response);
        }, error => {
          console.error('Error actualizando la ficha ginecológica', error);
        });
    } else {
      console.error('El formulario no es válido');
    }
  }
}