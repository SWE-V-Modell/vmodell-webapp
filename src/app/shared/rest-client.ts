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
  getDependentEntity<T>(segment: string): Observable<T> {
    return this.http.get<T>(this.path + segment);
  }
  getDependentEntities<T>(segment: string): Observable<T[]> {
    return this.http.get<T[]>(this.path + segment);
  }
  getEntityById(id: number): Observable<T> {
    return this.http.get<T>(this.path + '?id=' + id.toString());
  }
  postEntity(id: number, entity: T) {
    this.http.post<T>(this.path + '/' + id, entity, { headers: headers }).subscribe(() => { });
  }
  putEntity(id: number, entity: T) {
    this.http.post<T>(this.path + '/' + id, entity, { headers: headers }).subscribe(() => { });
  }
  deleteEntity(id: any) {
    this.http.delete(this.path + id).subscribe(() => { });
  }
}