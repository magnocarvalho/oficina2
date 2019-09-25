import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthfireService } from '../services/authfire.service';

@Injectable({
  providedIn: 'root'
})
export class FormGuard implements CanActivate {

  constructor(
    public authService: AuthfireService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isLoggedInNotUser) {

      this.router.navigate(['login'])
    }
    return true;
  }

}
