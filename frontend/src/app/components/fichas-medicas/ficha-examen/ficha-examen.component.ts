import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ficha-examen',
  templateUrl: './ficha-examen.component.html',
  styleUrls: ['./ficha-examen.component.css']
})
export class FichaExamenComponent implements OnInit {
  fichaExamenForm!: FormGroup;

  campos = ['campo1', 'campo2', 'campo3', 'campo4', 'campo5', 'campo6', 'campo7', 'campo8'];  // Puedes cambiar los nombres por los reales

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // Inicializamos el formulario reactivo con los campos correspondientes
    this.fichaExamenForm = this.fb.group({
      fecha: ['', Validators.required],
      campo1: [''],  // Estos campos son placeholders, reemplázalos con nombres reales
      campo2: [''],
      campo3: [''],
      campo4: [''],
      campo5: [''],
      campo6: [''],
      campo7: [''],
      campo8: [''],
      detallesAdicionales: ['']
    });
  }

  onSubmit(): void {
    if (this.fichaExamenForm.valid) {
      const fichaData = this.fichaExamenForm.value;
      const pacienteId = '123'; // Debes obtener el ID del paciente de manera dinámica

      // Hacer la solicitud PUT para actualizar la ficha de examen
      this.http.put(`/api/pacientes/${pacienteId}/ficha-examen`, fichaData)
        .subscribe(response => {
          console.log('Ficha de examen actualizada', response);
        }, error => {
          console.error('Error actualizando la ficha de examen', error);
        });
    } else {
      console.error('El formulario no es válido');
    }
  }
}
