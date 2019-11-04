import { Component, OnInit } from '@angular/core';
import { Promo } from 'src/app/model/promo';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  public favoritos: Promo = new Promo();
  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.getData('favorite').subscribe(res => {
      this.favoritos = res;
    })
  }

}
