import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from "@angular/forms";
import { AuthfireService } from "src/app/services/authfire.service";

@Component({
  selector: "app-create-login",
  templateUrl: "./create-login.component.html",
  styleUrls: ["./create-login.component.css"]
})
export class CreateLoginComponent implements OnInit {
  form: FormGroup;
  imagemPerfil: any = "/assets/addfoto.png";
  arquivoImg: any;
  constructor(private formBuilder: FormBuilder, public auth: AuthfireService) {}

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
    var file: File = inputValue.files[0];
    // this.form.get("foto").setValue(file);
    this.arquivoImg = file;
    var myReader: FileReader = new FileReader();

    myReader.onload = e => {
      this.imagemPerfil = myReader.result;
    };
    myReader.readAsDataURL(file);
  }

  registrar() {
    console.log(this.form.value);
    this.auth
      .doRegister(this.form.value, this.arquivoImg)
      .then(res => console.log("registro", res));
  }
}
