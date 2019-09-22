import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { User } from "src/app/model/user";
import { Router } from "@angular/router";
import { AuthfireService } from "src/app/services/authfire.service";
import { Observable } from "rxjs";
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import { } from "googlemaps";
import PlaceResult = google.maps.places.PlaceResult;

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
  //variaveis maps
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;

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

  reEnviarEmail() {
    this.auth.doCheckEmail().then(res => {
      alert('Email reenviado para ' + this.email)
    })
  }

  async carregarDados() { }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }
}
