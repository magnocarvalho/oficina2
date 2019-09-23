import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    baseurl = 'http://localhost:1337/'
    constructor(private http: HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    post(rota, obj): Observable<any> {
        return this.http.post<any>(this.baseurl + rota, obj)
    }
    get(rota, param?): Observable<any> {
        return this.http.get<any>(this.baseurl + rota + '/' + param)
    }

    createUser(obj): Observable<any> {
        return this.post('user', obj)
    }
    errorHandl(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }

}
