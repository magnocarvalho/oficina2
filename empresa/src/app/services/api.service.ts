import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { retry, catchError } from 'rxjs/operators';
import { AuthfireService } from './authfire.service';


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    baseurl = 'http://localhost:1337/api/'
    private token: String;
    constructor(private http: HttpClient, public auth: AuthfireService) {

    }
    getToken(): String {
        if (this.token != "" && this.token != undefined && this.token != null) {
            return this.token
        } else {
            this.auth.user.subscribe(user => {
                if (user) {
                    console.log("Cliente", user.displayName)
                    user.getIdToken(true).then(idToken => {
                        return this.token = idToken
                    })
                } else {
                    return this.token = null;
                }
            })
        }
    }

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
    })

    post(rota, obj): Observable<any> {
        return this.http.post<any>(this.baseurl + rota, obj, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getToken()}`
            }
        })
    }
    get(rota, param?): Observable<any> {
        let url = `${this.baseurl}${rota}/`
        if (param != undefined)
            url + param
        return this.http.get<any>(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getToken()}`
            }
        })
    }

    createUser(obj): Observable<any> {
        return this.post('user', obj)
    }
    getUser(token): Observable<any> {
        this.token = token;
        return this.http.get<any>(this.baseurl + 'user', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        })
    }
    getTipos(): Observable<any> {
        return this.get('tipos')
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
