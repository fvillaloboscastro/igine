import { NgModule } from '@angular/core';
import { RouteGuard } from './shared/route-guard';
import { RouterModule, Routes } from '@angular/router';
import { FichaGinecologicaComponent } from './components/fichas-medicas/ficha-ginecologica/ficha-ginecologica.component';
import { FichaObstetricaComponent } from './components/fichas-medicas/ficha-obstetrica/ficha-obstetrica.component';
import { FichaExamenComponent } from './components/fichas-medicas/ficha-examen/ficha-examen.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirigir a login por defecto
  { path: 'login', component: LoginComponent },         // Login dentro del router-outlet
  { path: 'signup', component: SignUpComponent },       // Signup dentro del router-outlet
  { path: 'paciente', component: PacienteComponent, canActivate: [RouteGuard]}, // Ruta protegida por el guard
  { path: 'ficha-ginecologica', component: FichaGinecologicaComponent, canActivate: [RouteGuard]},
  { path: 'ficha-obstetrica', component: FichaObstetricaComponent, canActivate: [RouteGuard]},
  { path: 'ficha-examenes', component: FichaExamenComponent, canActivate: [RouteGuard]},
  { path: '**', redirectTo: 'login' } // Si se introduce una ruta no válida, redirigir a login
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
