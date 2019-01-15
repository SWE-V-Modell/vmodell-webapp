import { Injectable } from '@angular/core';
import { RestClient } from './rest-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  path = '/api';

  private adminClient: RestClient<Admin>;
  private dozentClient: RestClient<Dozent>;
  private gruppeClient: RestClient<Gruppe>;
  private modulClient: RestClient<Modul>;
  private studentClient: RestClient<Student>;
  private veranstaltungClient: RestClient<Veranstaltung>;
  private veranstaltungsgruppeClient: RestClient<Veranstaltungsgruppe>;

  constructor(private http: HttpClient) {
    this.adminClient = new RestClient<Admin>(http, this.path + '');
    this.dozentClient = new RestClient<Dozent>(http, this.path + '');
    this.gruppeClient = new RestClient<Gruppe>(http, this.path + '');
    this.modulClient = new RestClient<Modul>(http, this.path + '');
    this.studentClient = new RestClient<Student>(http, this.path + '');
    this.veranstaltungClient = new RestClient<Veranstaltung>(http, this.path + '');
    this.veranstaltungsgruppeClient = new RestClient<Veranstaltungsgruppe>(http, this.path + '');
  }

  getAllAdmins(): Observable<Admin[]> {
    return this.adminClient.getAll();
  }
  getAdmin(id: number): Observable<Admin> {
    return this.adminClient.getEntityById(id);
  }
  setAdmin(Admin: Admin) {
    this.adminClient.postEntity(Admin.Id, Admin);
  }
  createAdmin(Admin: Admin) {
    this.adminClient.putEntity(Admin.Id, Admin);
  }
  deleteAdmin(id: number) {
    this.adminClient.deleteEntity(id);
  }


  getAllDozents(): Observable<Dozent[]> {
    return this.dozentClient.getAll();
  }
  getDozent(id: number): Observable<Dozent> {
    return this.dozentClient.getEntityById(id);
  }
  setDozent(Dozent: Dozent) {
    this.dozentClient.postEntity(Dozent.Id, Dozent);
  }
  createDozent(Dozent: Dozent) {
    this.dozentClient.putEntity(Dozent.Id, Dozent);
  }
  deleteDozent(id: number) {
    this.dozentClient.deleteEntity(id);
  }


  getAllGruppes(): Observable<Gruppe[]> {
    return this.gruppeClient.getAll();
  }
  getGruppe(id: number): Observable<Gruppe> {
    return this.gruppeClient.getEntityById(id);
  }
  setGruppe(Gruppe: Gruppe) {
    this.gruppeClient.postEntity(Gruppe.Id, Gruppe);
  }
  createGruppe(Gruppe: Gruppe) {
    this.gruppeClient.putEntity(Gruppe.Id, Gruppe);
  }
  deleteGruppe(id: number) {
    this.gruppeClient.deleteEntity(id);
  }


  getAllModuls(): Observable<Modul[]> {
    return this.modulClient.getAll();
  }
  getModul(id: number): Observable<Modul> {
    return this.modulClient.getEntityById(id);
  }
  setModul(Modul: Modul) {
    this.modulClient.postEntity(Modul.Id, Modul);
  }
  createModul(Modul: Modul) {
    this.modulClient.putEntity(Modul.Id, Modul);
  }
  deleteModul(id: number) {
    this.modulClient.deleteEntity(id);
  }


  getAllStudents(): Observable<Student[]> {
    return this.studentClient.getAll();
  }
  getStudent(id: number): Observable<Student> {
    return this.studentClient.getEntityById(id);
  }
  setStudent(Student: Student) {
    this.studentClient.postEntity(Student.Id, Student);
  }
  createStudent(Student: Student) {
    this.studentClient.putEntity(Student.Id, Student);
  }
  deleteStudent(id: number) {
    this.studentClient.deleteEntity(id);
  }


  getAllVeranstaltungs(): Observable<Veranstaltung[]> {
    return this.veranstaltungClient.getAll();
  }
  getVeranstaltung(id: number): Observable<Veranstaltung> {
    return this.veranstaltungClient.getEntityById(id);
  }
  setVeranstaltung(Veranstaltung: Veranstaltung) {
    this.veranstaltungClient.postEntity(Veranstaltung.Id, Veranstaltung);
  }
  createVeranstaltung(Veranstaltung: Veranstaltung) {
    this.veranstaltungClient.putEntity(Veranstaltung.Id, Veranstaltung);
  }
  deleteVeranstaltung(id: number) {
    this.veranstaltungClient.deleteEntity(id);
  }


  getAllVeranstaltungsgruppes(): Observable<Veranstaltungsgruppe[]> {
    return this.veranstaltungsgruppeClient.getAll();
  }
  getVeranstaltungsgruppe(id: number): Observable<Veranstaltungsgruppe> {
    return this.veranstaltungsgruppeClient.getEntityById(id);
  }
  setVeranstaltungsgruppe(Veranstaltungsgruppe: Veranstaltungsgruppe) {
    this.veranstaltungsgruppeClient.postEntity(Veranstaltungsgruppe.Id, Veranstaltungsgruppe);
  }
  createVeranstaltungsgruppe(Veranstaltungsgruppe: Veranstaltungsgruppe) {
    this.veranstaltungsgruppeClient.putEntity(Veranstaltungsgruppe.Id, Veranstaltungsgruppe);
  }
  deleteVeranstaltungsgruppe(id: number) {
    this.veranstaltungsgruppeClient.deleteEntity(id);
  }

}
