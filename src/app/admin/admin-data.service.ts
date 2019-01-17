import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {

  constructor(private data: AdminDataService) { }

  student: Student[] = [{
    Id: 0,
    Name: 'Max Mustermann',
    EMail: 'max.mustermann@email.de',
    Gruppe: '',
    Passwort: '12345',
  }, {
    Id: 1,
    Name: 'Erika Musterfrau',
    EMail: 'erika.musterfrau@email.de',
    Gruppe: '',
    Passwort: '12345',
  }, {
    Id: 2,
    Name: 'Hans Beispiel',
    EMail: 'hans.beispiel@email.de',
    Gruppe: '',
    Passwort: '12345',
  }, {
    Id: 3,
    Name: 'Peter Exampel',
    EMail: 'peter.exampel@email.de',
    Gruppe: '',
    Passwort: '12345',
  }];
  dozent: Dozent[] = [
    {
    Id: 0,
    Name: 'Prof. Dr. Samanpour',
    EMail: 'samanpour@fh-swf.de',
    Passwort: '12345',
  }, {
    Id: 1,
    Name: 'Dr. Ostermann',
    EMail: 'ostermann@fh-swf.de',
    Passwort: '12345',
  }, {
    Id: 2,
    Name: 'Frau Piper',
    EMail: 'piper@fh-swf.de',
    Passwort: '12345',
  }, {
    Id: 3,
    Name: 'Andre',
    EMail: 'andre@fh-swf.de',
    Passwort: '12345',
  }, {
    Id: 4,
    Name: 'Robin',
    EMail: 'robin@fh-swf.de',
    Passwort: '12345',
  }];
  veranstaltung: Veranstaltung[] = [{
    Id: 0,
    Modul: 0,
    Datum: new Date(2019, 1, 11),
    Von: new Date(2019, 1, 11, 12, 0),
    Bis: new Date(2019, 1, 11, 15, 15),
    Anmerkung: 'Das ist eine Anmerkung',
  }, {
    Id: 1,
    Modul: 1,
    Datum: new Date(2019, 1, 18),
    Von: new Date(2019, 1, 18, 12, 30),
    Bis: new Date(2019, 1, 18, 15, 45),
    Anmerkung: 'Das ist eine Anmerkung',
  }, {
    Id: 2,
    Modul: 2,
    Datum: new Date(2019, 1, 25),
    Von: new Date(2019, 1, 25, 12, 0),
    Bis: new Date(2019, 1, 25, 15, 15),
    Anmerkung: 'Das ist eine Anmerkung',
  }]
  modul: Modul[] = [{
    Id: 0,
    Dozent: 2,
    Beschreibung: 'Controlling',
  }, {
    Id: 1,
    Dozent: 0,
    Beschreibung: 'IT Management',
  }, {
    Id: 2,
    Dozent: 1,
    Beschreibung: 'Personalmanagement',
  },]
  
  //Benutzer
  getStudent(id: number): Observable<Student> {
    return of(this.student.find(s => s.Id == id));
  }
  getAllStudents(): Observable<Student[]> {
    return of(this.student);
  }
  setStudent(student: Student) {
    this.student[this.student.indexOf(this.student.find(s => s.Id == student.Id))] = student;
  }
  createStudent(student: Student) {
    this.student.push(student);
  }

  //Dozent
  getDozent(id: number):Observable<Dozent> {
    return of(this.dozent.find(s => s.Id == id));
  }
  getAllDozents():Observable<Dozent[]> {
    return of(this.dozent);
  }
  setDozent(dozent: Dozent) {
    this.dozent[this.dozent.indexOf(this.dozent.find(d => d.Id == dozent.Id))] = dozent;
  }
  createDozent(dozent: Dozent) {
    this.dozent.push(dozent);
  }

  //Veranstaltung
  getVeranstaltung(id: number): Observable<Veranstaltung> {
    return of(this.veranstaltung.find(v => v.Id == id));
  }
  getAllVeranstaltungs(): Observable<Veranstaltung[]> {
    return of(this.veranstaltung);
  }
  setVeranstaltung(veranstaltung: Veranstaltung) {
    this.veranstaltung[this.veranstaltung.indexOf(this.veranstaltung.find(v => v.Id == veranstaltung.Id))] = veranstaltung;
  }
  createVeranstaltung(veranstaltung: Veranstaltung) {
    this.veranstaltung.push(veranstaltung);
  }

  //Modul
  getModul(id: number): Observable<Modul>{
    return of(this.modul.find(m => m.Id == id));
  }
  getAllModuls(){
    return of(this.modul);
  }
  setModul(modul: Modul){
    this.modul[this.modul.indexOf(this.modul.find(m => m.Id == modul.Id))] = modul;
  }
  createModul(modul: Modul){
    this.modul.push(modul);
  }
}
