import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { FichaGinecologicaComponent } from './components/fichas-medicas/ficha-ginecologica/ficha-ginecologica.component';
import { FichaObstetricaComponent } from './components/fichas-medicas/ficha-obstetrica/ficha-obstetrica.component';
import { FichaExamenComponent } from './components/fichas-medicas/ficha-examen/ficha-examen.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DiaryComponent } from './components/diary/diary.component';
import { DiaryFormComponent } from './components/diary-form/diary-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthInterceptor } from './shared/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    FichaGinecologicaComponent,
    FichaObstetricaComponent,
    FichaExamenComponent,
    SidebarComponent,
    HeaderComponent,
    DiaryComponent,
    DiaryFormComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
