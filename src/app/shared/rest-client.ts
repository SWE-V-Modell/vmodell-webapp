import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headers = new HttpHeaders()
  .set('Access-Control-Allow-Origin', '*')
  .set('Content-Type', 'application/json');

export class RestClient<T> {

  private path: string;

  constructor(private http: HttpClient, path: string) {
    this.path = path;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.path);
  }
  getById(id: number): Observable<T> {
    return this.http.get<T>(this.path + '?id=' + id.toString());
  }
  create(id: number, entity: T) {
    this.http.post<T>(this.path + '/' + id, entity, { headers: headers }).subscribe(() => { });
  }
  update(id: number, entity: T) {
    this.http.put<T>(this.path + '/' + id, entity, { headers: headers }).subscribe(() => { });
  }
  delete(id: any) {
    this.http.delete(this.path + id).subscribe(() => { });
  }
}