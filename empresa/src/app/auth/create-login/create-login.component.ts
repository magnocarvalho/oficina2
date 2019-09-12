import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: "app-create-login",
  templateUrl: "./create-login.component.html",
  styleUrls: ["./create-login.component.css"]
})
export class CreateLoginComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      pass: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
}
