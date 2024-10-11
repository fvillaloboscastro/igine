import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth-service';  // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();  // Llama al método de logout en AuthService
  }
}
