import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public signupForm!: FormGroup;
  public isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
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
      .signupUser(
        this.signupForm.value.username,
        this.signupForm.value.password
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response.message); // Manejo del mensaje de éxito
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Sign-up failed:', error); // Manejo de errores
        },
      });
  }
}
