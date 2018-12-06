import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // only for early development
  private loggedIn: boolean = true;

  constructor(private router: Router) { }

  getLogin(): boolean {
    return this.loggedIn;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['/login/']);
  }
}
