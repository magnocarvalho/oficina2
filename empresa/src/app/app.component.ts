import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "./model/user";
import { AuthfireService } from "./services/authfire.service";

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
  constructor(private rota: Router, public auth: AuthfireService) {
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

  linkRota(tmp) {
    this.rota.navigate([tmp]);
  }

  onLoginOut() {
    this.auth.doLogout();
    this.linkRota('index');
  }
}
