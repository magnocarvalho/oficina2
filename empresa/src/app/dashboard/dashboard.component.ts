import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Usuario } from '../model/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public user: Usuario;
  constructor(public api: ApiService) {
    let usss = new Usuario()
    usss = api.getUserDados;
     this.user.displayName = usss.displayName;
      this.user.email = usss.email;
     this.user.uid = usss.uid;
    // this.user.numero = usss.numero;
    // this.user.estado = usss.estado;
    console.log(usss)

  }

  ngOnInit() {
  }

}
