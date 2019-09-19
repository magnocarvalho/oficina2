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
  user: User = {
    uid: "",
    email: "",
    displayName: "",
    photoURL: "",
    emailVerified: undefined
  };
  constructor(private rota: Router, public auth: AuthfireService) {
    auth.user.subscribe(user => {
      this.user = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      };
    });
  }

  linkRota(tmp) {
    this.rota.navigate([tmp]);
  }
}
