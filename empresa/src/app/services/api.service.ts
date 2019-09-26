import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { retry, catchError } from 'rxjs/operators';
import { AuthfireService } from './authfire.service';
import { environment } from "src/environments/environment";
import { Usuario, User } from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    baseurl = environment.baseURL
    private token: String;
    public userFire: User;
    public userDados: Usuario;
    constructor(private http: HttpClient, public auth: AuthfireService) {
        this.getToken()
    }

    get getUserDados(): Usuario {
        return this.userDados;
    }

    loginInit() {
        if (this.userFire) {
            console.log(this.userFire)
        }

    }

    getUserInformation() {
        return new Promise<Usuario>((resolve, reject) => {
            this.get('infoUser').subscribe(res => {
                resolve(res)
            }, err => {
                reject(err)
            })
        })
    }


    getToken() {
        this.auth.user.subscribe(user => {
            if (user) {
                console.log("Cliente", user.displayName)
                user.getIdToken(true).then(idToken => {
                    this.token = idToken;
                    if (this.token)
                        this.getUser(idToken).subscribe(empresa => {
                            console.log(empresa)
                        })
                }).catch(erro => {
                    this.logout()
                })
            } else {
                this.logout()
            }
        });
    }
    post(rota, obj): Observable<any> {
        return this.http.post<any>(this.baseurl + rota, obj, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
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
                'Authorization': `Bearer ${this.token}`
            }
        })
    }

    createUser(obj): Observable<any> {
        return this.post('user', obj)
    }
    getUser(token): Observable<any> {
        this.token = token;
        let retorno: Observable<any>;
        retorno = this.http.get<any>(this.baseurl + 'user', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        })
        retorno.subscribe(res => {

            this.userDados = Object.assign({}, res)
            // this.userDados = Object.assign({}, res, this.userFire)
            localStorage.setItem('userDados', JSON.stringify(this.userDados));
        }, err => {
            this.logout()
            console.log('erro ao buscar o usario :', err.message)
        })


        return retorno

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
    logout() {


        localStorage.setItem('userDados', null);
        this.auth.doLogout().finally(() => {
            console.error('Logout');
        })
        this.token = null;
        this.userDados = null;
        this.userFire = null;
    }


}
