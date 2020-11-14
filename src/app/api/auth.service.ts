import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const AUTH_API = "http://127.0.0.1:3001/";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  search(credentials): Observable<any> {
    return this.http.get(AUTH_API + 'getSatInfo?id=' + credentials.id);
  }

  handleError(error) {
    return "Salut";
  }
}
