import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthModel } from './auth-model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = null; // Inicializado como null
  private authenticatedSub = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  // Retorna si el usuario está autenticado
  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  // Retorna el observable para saber si está autenticado
  getAuthenticatedSub() {
    return this.authenticatedSub.asObservable();
  }

  // Retorna el token de autenticación
  getToken() {
    return this.token;
  }

  // Registro de usuario
  signupUser(email: string, password: string): Observable<{ message: string }> {
    const authData = { email, password };
    return this.http.post<{ message: string }>(
      'http://localhost:3000/api/auth/sign-up', // URL del backend para el registro
      authData
    );
  }
  
  

  // Inicio de sesión de usuario
  loginUser(email: string, password: string): Observable<{ token: string }> {
    const authData: AuthModel = { email, password };
    return this.http.post<{ token: string }>(
      'http://localhost:3000/api/auth/login',
      authData
    );
  }

  // Manejar la respuesta del inicio de sesión
  handleLoginResponse(res: { token: string }) {
    this.token = res.token;
    if (this.token) {
      this.isAuthenticated = true;
      this.authenticatedSub.next(true);
      this.storeLoginDetails(this.token); // Guardar token en localStorage
      this.router.navigate(['/paciente']); // Redirigir a la ruta 'paciente'
    }
  }

  // Cerrar sesión
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authenticatedSub.next(false);
    this.clearLoginDetails();
    this.router.navigate(['/']);
  }

  // Guardar los detalles de inicio de sesión en localStorage
  storeLoginDetails(token: string) {
    localStorage.setItem('token', token);
  }

  // Eliminar los detalles de inicio de sesión de localStorage
  clearLoginDetails() {
    localStorage.removeItem('token');
  }

  // Obtener los datos de localStorage
  getLocalStorageData() {
    const token = localStorage.getItem('token');
    return token ? { token: token } : null;
  }

  // Autenticar desde el localStorage si ya hay un token guardado
  authenticateFromLocalStorage() {
    const localStorageData = this.getLocalStorageData();
    if (localStorageData) {
      this.token = localStorageData.token;
      this.isAuthenticated = true;
      this.authenticatedSub.next(true);
    }
  }
}
