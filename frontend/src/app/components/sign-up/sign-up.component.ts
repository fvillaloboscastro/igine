import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Asegúrate de importar Router
import { AuthService } from '../../shared/auth-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public signupForm!: FormGroup;
  public isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {} // Inyectar Router

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]), // Agregar validación para email
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }
    this.isLoading = true;

    this.authService
      .signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response.message);
          this.router.navigate(['/login']); // Redirigir a la página de login
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error en el registro:', error);
        },
      });
  }
}
