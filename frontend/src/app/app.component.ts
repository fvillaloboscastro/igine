import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth-service'; // Importa el AuthService para autenticar desde localStorage

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    // Autenticar al usuario desde localStorage al cargar la aplicación
    this.authService.authenticateFromLocalStorage();
  }

  // Este método verifica si estamos en las rutas de login o signup
  isLoginOrSignup(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/login' || currentRoute === '/signup';
  }
}
