import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  routes = [
    { text: 'Dashboard', route: '', color: 'primary', action: () => { } },
    { text: 'Logout', route: '/login/', color: 'danger', action: () => { console.log(this.loginService.getLogin()); this.loginService.logout() } },
  ]
  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

}
