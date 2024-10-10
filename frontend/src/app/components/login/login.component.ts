import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    // Inicialización de loginForm
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // El formulario ya está inicializado, no es necesario inicializarlo de nuevo aquí
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Verifica si el formulario es válido antes de enviar
      const { username, password } = this.loginForm.value;
      this.authService.loginUser(username, password); // Envía los datos al servicio de autenticación
    } else {
      console.log('Formulario no válido'); // Maneja los errores si el formulario no es válido
    }
  }
}
