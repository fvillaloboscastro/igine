import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthModel } from './auth-model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = null; // Initialized as null
  private authenticatedSub = new Subject<boolean>();
  private isAuthenticated = false;
  private logoutTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthenticatedSub() {
    return this.authenticatedSub.asObservable();
  }

  getToken() {
    return this.token;
  }

  signupUser(
    email: string,
    password: string
  ): Observable<{ message: string }> {
    const authData: AuthModel = { email: email, password: password };
    return this.http.post<{ message: string }>(
      'http://localhost:3000/api/auth/sign-up',
      authData
    );
  }

  loginUser(
    email: string,
    password: string
  ): Observable<{ token: string; expiresIn: number }> {
    const authData: AuthModel = { email, password };
    return this.http.post<{ token: string; expiresIn: number }>(
      'http://localhost:3000/api/auth/login',
      authData
    );
  }

  handleLoginResponse(res: { token: string; expiresIn: number }) {
    this.token = res.token;
    if (this.token) {
      this.authenticatedSub.next(true);
      this.isAuthenticated = true;
      this.router.navigate(['/paciente']); // Redirige a la ruta después de guardar el token
      this.setLogoutTimer(res.expiresIn);
      const now = new Date();
      const expiresDate = new Date(now.getTime() + res.expiresIn * 1000);
      this.storeLoginDetails(this.token, expiresDate); // Guardar detalles en el localStorage
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authenticatedSub.next(false);
    this.router.navigate(['/']);
    clearTimeout(this.logoutTimer);
    this.clearLoginDetails();
  }

  storeLoginDetails(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expirationDate.toISOString());
  }

  clearLoginDetails() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
  }

  getLocalStorageData() {
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');
    if (!token || !expiresIn) {
      return null;
    }
    return {
      token: token,
      expiresIn: new Date(expiresIn),
    };
  }

  authenticateFromLocalStorage() {
    const localStorageData = this.getLocalStorageData();
    if (localStorageData) {
      const now = new Date();
      const expiresIn = localStorageData.expiresIn.getTime() - now.getTime();
      if (expiresIn > 0) {
        this.token = localStorageData.token;
        this.isAuthenticated = true;
        this.authenticatedSub.next(true);
        this.setLogoutTimer(expiresIn / 1000); // Corrected use of setTimeout
      }
    }
  }

  private setLogoutTimer(expiresIn: number) {
    this.logoutTimer = setTimeout(() => this.logout(), expiresIn * 1000);
  }
}
