import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPerson } from './person';

@Injectable({
  providedIn: 'root',
})
export class PersonlistService {
  private _URL: string = 'http://localhost:8080/Proreg/webapi/persons';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    observe: 'response',
  };

  constructor(private http: HttpClient) {}

  getPersons(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(this._URL);
  }

  addPerson(person: IPerson): Observable<any> {
    return this.http.post(this._URL, person);
  }

  getPersonById(i: any): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(this._URL + '/' + i);
  }
}
