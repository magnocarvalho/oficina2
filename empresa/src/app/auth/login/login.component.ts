import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      pass: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
}
