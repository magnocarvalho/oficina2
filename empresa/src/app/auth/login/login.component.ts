import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from "@angular/forms";
import { AuthfireService } from 'src/app/services/authfire.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, public auth: AuthfireService, public rotas: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  goLogin() {
    this.auth.doLogin(this.form.value).then(res => {
      this.rotas.navigate(["form-empresa"]);
    }).catch(err => {
      console.error(err)
    })
  }
}
