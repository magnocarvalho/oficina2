import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/user";
import { Router } from "@angular/router";
import { AuthfireService } from "src/app/services/authfire.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-infos-empresa",
  templateUrl: "./infos-empresa.component.html",
  styleUrls: ["./infos-empresa.component.css"]
})
export class InfosEmpresaComponent implements OnInit {
  displayName: any = null;
  email: any = null;
  emailVerified: boolean = false;
  photoURL: any = null;
  uid: any = null;
  constructor(private rota: Router, public auth: AuthfireService) {
    this.auth.user.subscribe(user => {
      if (user) {
        this.displayName = user.displayName;
        this.email = user.email;
        this.emailVerified = user.emailVerified;
        this.photoURL = user.photoURL;
        this.uid = user.uid;
      }
    });
  }

  ngOnInit() {
    this.carregarDados();
  }

  async carregarDados() {}
}
