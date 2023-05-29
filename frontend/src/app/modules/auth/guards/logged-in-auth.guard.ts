import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInAuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    return this.checkAuthentication();
  }

  canLoad(): boolean {
    return this.checkAuthentication();
  }

  private checkAuthentication(): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }
    this.router.navigate(['/welcome']);
    return false;
  }
}
