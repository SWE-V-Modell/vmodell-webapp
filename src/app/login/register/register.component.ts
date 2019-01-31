import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.loginService.login(this.email, this.password);
    this.router.navigate(['']);
  }
}
