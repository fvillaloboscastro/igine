import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FichaGinecologicaComponent } from './components/fichas-medicas/ficha-ginecologica/ficha-ginecologica.component';
import { FichaObstetricaComponent } from './components/fichas-medicas/ficha-obstetrica/ficha-obstetrica.component';
import { FichaExamenComponent } from './components/fichas-medicas/ficha-examen/ficha-examen.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'ficha-ginecologica', component: FichaGinecologicaComponent },
  { path: 'ficha-obstetrica', component: FichaObstetricaComponent },
  { path: 'ficha-examenes', component: FichaExamenComponent },
  { path: 'paciente', component: PacienteComponent },
  { path: '', redirectTo: '/sign-up', pathMatch: 'full' },
  { path: '**', redirectTo: '/sign-up' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
