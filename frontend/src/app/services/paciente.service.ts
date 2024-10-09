import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  URL_API = 'http://Localhost:3000/api/pacientes'

  pacientes: Paciente[] = [];

  constructor(private http:HttpClient) {} 

  // Método para guardar un nuevo paciente (POST)
  guardarPaciente(paciente: Paciente): Observable<any> {
    return this.http.post(this.URL_API, paciente);  // Enviar los datos al backend
  }
}

