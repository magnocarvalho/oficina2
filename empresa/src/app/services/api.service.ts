import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs'
import { retry, catchError } from 'rxjs/operators';
import { AuthfireService } from './authfire.service';
import { environment } from "src/environments/environment";
import { Usuario, User } from '../model/user';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService implements HttpInterceptor {

    baseurl = environment.baseURL
    private token: String = null;
    public userFire: User;
    public userDados: Usuario;
    public isLoading = new BehaviorSubject(false);
    private requests: HttpRequest<any>[] = [];
    public userComplete = new BehaviorSubject(false);

    constructor(private http: HttpClient, public auth: AuthfireService, public loadingBar: LoadingBarService) {
        this.checkToken()
    }
    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.isLoading.next(this.requests.length > 0);
    }

    checkToken() {
        //console.log(this.userDados, this.userFire, this.token)
        if (this.token == null) {
            this.getToken()
        }

    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.requests.push(req);
        // //("No of requests--->" + this.requests.length);
        this.isLoading.next(true);
        return Observable.create(observer => {
            const subscription = next.handle(req)
                .subscribe(
                    event => {
                        if (event instanceof HttpResponse) {
                            this.removeRequest(req);
                            observer.next(event);
                        }
                    },
                    err => {
                        // alert('error returned');
                        this.removeRequest(req);
                        observer.error(err);
                    },
                    () => {
                        this.removeRequest(req);
                        observer.complete();
                    });
            // remove request from queue when cancelled
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }

    get getUserDados(): Usuario {
        return this.userDados;
    }

    getToken() {
        this.auth.user.subscribe(user => {
            if (user) {
                // //("Cliente", user.displayName, user.emailVerified)
                if (user.emailVerified) {
                    // //('usuario verificado')
                    user.getIdToken(true).then(idToken => {
                        this.token = idToken;
                        if (this.token) {
                            if (this.userComplete.value != true) {
                                this.getUser(this.token).subscribe(empresa => {
                                    console.log('endereço da empresa', empresa.googlePlace)
                                    this.userComplete.next(true)
                                })
                            }
                        }
                        // this.userComplete.next(true)
                        this.loadingBar.complete()
                    }).catch(erro => {
                        // this.logout()
                        this.loadingBar.complete()

                        // //('error getToken', erro)

                    })
                } else {
                    this.loadingBar.complete()

                    // //('usuario nao verificado')
                }
            } else {
                this.loadingBar.complete()

                // //('usuario', user)
                // this.logout()
            }
        });
    }
    post(rota, obj): Observable<any> {
        this.loadingBar.start()
        return this.http.post<any>(this.baseurl + rota, obj, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        })
    }
    get(rota, param?): Observable<any> {
        this.loadingBar.start()
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
    getUserLogin(token): Observable<any> {
        return this.getUser(token);
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

            // this.userDados = Object.assign({}, res, this.userFire)
            if (res != undefined) {
                this.userDados = Object.assign({}, res)
                localStorage.setItem('userDados', JSON.stringify(this.userDados));
                // console.log('Dados dos usuario', res)
                this.userComplete.next(true)
            } else {
                this.userComplete.next(false)
                console.log("Erro ao buscar o usuario", res)
            }

        }, err => {
            // //(err.status)
            if (err.status == '401') {
                // //('erro ao buscar o usario 401: nao autorizado falta token', err.message)

            }
            if (err.status == 405) {
                // //('erro ao buscar o usario 405: usuario nao encontrado', err.message)
            } else {
                // this.logout()
                // //('erro ao buscar o usario :', err.message)
            }

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
            console.log('Logout');
        })
        this.token = null;
        this.userDados = null;
        this.userFire = null;
    }


}
