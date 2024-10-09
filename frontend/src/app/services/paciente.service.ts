import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http:HttpClient) {}

  URL_API = 'http://Localhost:3000/api/pacientes'

 


  getPacientes(){
    return this.http.get(this.URL_API);

  }
}
