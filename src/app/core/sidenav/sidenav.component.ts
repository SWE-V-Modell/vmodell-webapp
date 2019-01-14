import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  routes = [
    { text: 'Startseite', route: '', color: 'primary' },
    { text: 'Kurse', route: '/kurs', color: 'primary' },
    { text: 'Statistiken', route: '/statistics/', color: 'primary' },
  ]
  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

  logout() {
    console.log(this.loginService.getLogin()); this.loginService.logout()
  }
}
