import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.loginUser(email, password).subscribe({
        next: (res) => {
          this.authService.handleLoginResponse(res);  // Llama a la función para manejar el token y redirigir
        },
        error: (err) => {
          console.log('Error de autenticación', err);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
  
