import { Component, inject } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private route = inject(Router)
  private tokenService = inject(TokenService)
  logout() {
    this.tokenService.clearToken();
    this.route.navigate(['/login']);
  }
}
