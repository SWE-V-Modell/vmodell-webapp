import { Injectable } from '@angular/core';
import { RestClient } from './rest-client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  path = 'https://localhost:5001/api/';

  accountClient: RestClient<MyAccount>;
  adminClient: RestClient<Admin>;
  dozentClient: RestClient<Dozent>;
  gruppeClient: RestClient<Gruppe>;
  studentClient: RestClient<Student>;
  veranstaltungClient: RestClient<Veranstaltung>;
  veranstaltungsgruppeClient: RestClient<Veranstaltungsgruppe>;

  constructor(private http: HttpClient) {
    this.adminClient = new RestClient<Admin>(this.http, this.path + 'admin');
    this.accountClient = new RestClient<MyAccount>(this.http, this.path + 'account');
    this.dozentClient = new RestClient<Dozent>(this.http, this.path + 'dozent');
    this.gruppeClient = new RestClient<Gruppe>(this.http, this.path + 'gruppe');
    this.studentClient = new RestClient<Student>(this.http, this.path + 'student');
    this.veranstaltungClient = new RestClient<Veranstaltung>(this.http, this.path + 'veranstaltung');
    this.veranstaltungsgruppeClient = new RestClient<Veranstaltungsgruppe>(this.http, this.path + 'veranstaltungsgruppe');
  }
}
