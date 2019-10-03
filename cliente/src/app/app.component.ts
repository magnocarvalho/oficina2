import { Component, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, NavigationStart, NavigationError } from "@angular/router";
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { ApiService } from './services/api.service';
import { User } from './model/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-cliente';
  mobileQuery: MediaQueryList;
  cliente: User;
  private _mobileQueryListener: () => void;
  constructor(private rota: Router, public api: ApiService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    rota.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        api.user.subscribe(user => {
          if (user) {
            this.cliente = user
          }
        });
      }
      if (event instanceof NavigationError) {
        //caso de erro na rota ou falha na requisição
        // api.doLogout();
      }
    });

  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  linkRota(tmp) {
    this.rota.navigate([tmp]);
  }

  logout() {
    this.api.doLogout()
    this.rota.navigate(['login'])
  }
}
