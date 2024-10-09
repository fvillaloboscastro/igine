import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { PacienteComponent } from './components/paciente/paciente.component';
import { FichaGinecologicaComponent } from './components/fichas-medicas/ficha-ginecologica/ficha-ginecologica.component';
import { FichaObstetricaComponent } from './components/fichas-medicas/ficha-obstetrica/ficha-obstetrica.component';
import { FichaExamenComponent } from './components/fichas-medicas/ficha-examen/ficha-examen.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    FichaGinecologicaComponent,
    FichaObstetricaComponent,
    FichaExamenComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
