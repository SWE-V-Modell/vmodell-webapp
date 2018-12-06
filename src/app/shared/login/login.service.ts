import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // only for early development
  private loggedIn: boolean = true;

  constructor() { }

  getLogin(): boolean {
    return this.loggedIn;
  }
}
