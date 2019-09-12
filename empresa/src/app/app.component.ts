import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "empresa";
  constructor(private rota: Router) {}

  linkRota(tmp) {
    this.rota.navigate([tmp]);
  }
}
