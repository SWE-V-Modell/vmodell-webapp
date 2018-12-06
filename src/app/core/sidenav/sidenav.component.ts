import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  routes = [
    { text: 'Dashboard', route: '', color: 'primary' },
    { text: 'Dashboard', route: '', color: 'warning' },
  ]
  constructor() { }

  ngOnInit() {
  }

}
