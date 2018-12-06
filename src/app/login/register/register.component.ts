import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.loginService.login();
    this.router.navigate([''])
  }
}
