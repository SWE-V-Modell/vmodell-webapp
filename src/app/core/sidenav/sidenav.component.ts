import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  routes = [
    { text: 'Startseite', route: '', color: 'primary', action: () => { } },
    { text: 'Kurse', route: '/kurs', color: 'primary', action: () => { } },
    { text: 'Statistiken', route: '/statistics/', color: 'primary', action: () => { } },
    { text: 'Ausloggen', route: '/login/', color: 'danger', action: () => { console.log(this.loginService.getLogin()); this.loginService.logout() } },
  ]
  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

}
