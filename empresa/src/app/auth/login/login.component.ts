import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from "@angular/forms";
import { AuthfireService } from 'src/app/services/authfire.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, public api: ApiService, public auth: AuthfireService, public rotas: Router, public snack: MatSnackBar) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  goLogin() {
    this.auth.doLogin(this.form.value).then(res => {
      this.api.getUser(res.uid).subscribe(usuario => {
        this.snack.open("Login Realizado com sucesso", 'ok', { duration: 5000 })
        this.rotas.navigate(["index"]);
      }, err => {
        this.snack.open("Login Realizado com sucesso, falta terminar o cadastro", 'ok', { duration: 5000 })
        this.rotas.navigate(["form-empresa"]);
      })

    }).catch(err => {
      this.snack.open(err.message, 'erro', { duration: 5000 })
      console.error(err)
    })
  }


}
