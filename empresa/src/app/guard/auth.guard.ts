import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: ApiService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn !== true) {
    //  console.log('Não logado')
      this.router.navigate(['index'])
      return false
    }
    // else
    //   if (!this.authService.empresaDados) {
    //     // alert('Termine Seu cadastro!')
    //     this.router.navigate(['form-empresa'])
    //     return false
    //   }
    return true;
  }

}
