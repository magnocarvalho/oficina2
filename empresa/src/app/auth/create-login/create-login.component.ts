import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from "@angular/forms";
import { AuthfireService } from "src/app/services/authfire.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-create-login",
  templateUrl: "./create-login.component.html",
  styleUrls: ["./create-login.component.css"]
})
export class CreateLoginComponent implements OnInit {
  form: FormGroup;
  imagemPerfil: any = "/assets/addfoto.png";
  arquivoImg: any;
  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthfireService,
    public rota: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      pass: ["", [Validators.required, Validators.minLength(6)]],
      foto: [null, [Validators.required]]
    });
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    try {
      var file: File = inputValue.files[0];
      // this.form.get("foto").setValue(file);
      this.arquivoImg = file;
      var myReader: FileReader = new FileReader();

      myReader.onload = e => {
        this.imagemPerfil = myReader.result;
      };
      myReader.readAsDataURL(file);
    } catch (e) {
      console.error(e);
    }
  }

  loginFacebook(){
    this.auth.doFacebookLogin().then(res => {
      this.rota.navigate(["form-empresa"])
    }).catch(erro => {
      this.snackBar.open(erro.message, "erro", {
        duration: 3000
      });
    })
  }

  registrar() {
    if (!this.arquivoImg) {
      this.snackBar.open("Carregamento da imagem obrigatorio", "ok", {
        duration: 4000
      });
      return;
    }
    if (this.form.valid) {
      this.auth
        .doRegister(this.form.value, this.arquivoImg)
        .then(res => {
          console.log("registro", res);
          this.rota.navigate(["form-empresa"]);
        })
        .catch(erro => {
          this.snackBar.open(erro.message, "ok", {
            duration: 3000
          });
        });
    } else {
      this.snackBar.open("Todos os campos são obrigatorios", "ok", {
        duration: 3000
      });
    }
  }
}
