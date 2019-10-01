import { Component } from "@angular/core";
import { Router, NavigationStart, NavigationError } from "@angular/router";
import { User } from "./model/user";
import { AuthfireService } from "./services/authfire.service";
import { ApiService } from './services/api.service';
import { Subject } from 'rxjs';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "empresa";

  uid: any = "";
  email: any = "";
  displayName: any = "";
  photoURL: any = "";
  emailVerified: boolean = false;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.api.isLoading;
  userComplete: Subject<boolean> = this.api.userComplete;
  constructor(private rota: Router, public auth: AuthfireService, public api: ApiService) {
    rota.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        auth.user.subscribe(user => {
          if (user) {
            this.uid = user.uid;
            this.email = user.email;
            this.displayName = user.displayName;
            this.photoURL = user.photoURL;
            this.emailVerified = user.emailVerified;
          }
        });
      }
      if (event instanceof NavigationError) {
        //caso de erro na rota ou falha na requisição
        // auth.doLogout();
      }
    });

  }

  linkRota(tmp) {
    this.rota.navigate([tmp]);
  }

  onLoginOut() {
    // this.auth.doLogout();
    this.api.logout()
    this.uid = "";
    this.email = "";
    this.displayName = "";
    this.photoURL = "";
    this.emailVerified = false;
    this.linkRota('index');
  }
}
