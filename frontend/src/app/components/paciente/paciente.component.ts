import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  constructor(private PacienteService:PacienteService ) { }

  ngOnInit(): void {
    this.PacienteService.getPacientes().subscribe(      
      res => console.log(res),
    err => console.error(err));
    
  }

}
