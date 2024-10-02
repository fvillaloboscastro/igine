import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaGinecologicaComponent } from './components/fichas-medicas/ficha-ginecologica/ficha-ginecologica.component';
import { FichaObstetricaComponent } from './components/fichas-medicas/ficha-obstetrica/ficha-obstetrica.component';
import { FichaExamenComponent } from './components/fichas-medicas/ficha-examen/ficha-examen.component';
import { PacienteComponent } from './components/paciente/paciente.component';

const routes: Routes = [
  { path: 'ficha-ginecologica', component: FichaGinecologicaComponent },
  { path: 'ficha-obstetrica', component: FichaObstetricaComponent },
  { path: 'ficha-examenes', component: FichaExamenComponent },
  { path: 'paciente', component: PacienteComponent },
  { path: '', redirectTo: '/paciente', pathMatch: 'full' },
  { path: '**', redirectTo: '/paciente' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
