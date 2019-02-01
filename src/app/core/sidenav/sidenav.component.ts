import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../shared';
import {Role} from '../../../models/role';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  routes = [
    { text: 'Startseite', route: '', color: 'primary', role: Role.Student },
    { text: 'Admin', route: '/admin/', color: 'primary', role: Role.Admin },
    { text: 'Veranstaltungen', route: '/veranstaltung', color: 'primary', role: Role.Student },
    { text: 'Statistiken', route: '/statistics/', color: 'primary', role: Role.Student },
  ];
  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

  logout() {
    this.loginService.logout();
  }
}
