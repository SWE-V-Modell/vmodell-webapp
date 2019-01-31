import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from '../data.service';
import {Role} from '../../../models/role';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // only for early development
  private loggedIn = false;
  private role = Role.None;

  constructor(private router: Router, private dataService: DataService) { }

  getLogin(): boolean {
    return this.loggedIn;
  }

  getRole(): Role {
    return this.role;
  }

  login(email: string, password: string) {
    const accClient = this.dataService.accountClient;
    const admClient = this.dataService.adminClient;
    const dozClient = this.dataService.dozentClient;
    const stdClient = this.dataService.studentClient;

    let accId = -1;

    accClient.getByColumns([{col: 'Email', val: email}, {col: 'Password', val: password}]).subscribe(account => {
        console.log(account);
        if (account.length > 0) {
          accId = account[0].id;
          this.loggedIn = true;

          stdClient.getByColumn('account', accId).subscribe(student => {
            console.log(student);
            if (student != null) this.role = Role.Student;
          });
          dozClient.getByColumn('account', accId).subscribe(dozent => {
            console.log(dozent);
            if (dozent != null) this.role = Role.Dozent;
          });
          admClient.getByColumn('account', accId).subscribe(admin => {
            console.log(admin);
            if (admin != null) this.role = Role.Admin;
          });
        }
        console.log(this.loggedIn);
    });

      console.log('AM I LOGGED IN? ' + this.loggedIn);


  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['/login/']);
  }
}
