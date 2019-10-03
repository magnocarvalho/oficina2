import { Component, OnInit, Input, SimpleChanges, ViewChild, } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { ApiService } from 'src/app/services/api.service';
import Swiper, { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'ngx-useful-swiper';
import * as moment from 'moment'
import { LocationService } from 'src/app/services/location.service';
@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {
  @ViewChild('swipper', { static: false }) usefulSwiper: SwiperComponent;
  public retorno = [];
  public latitude: number = 0;
  public longitude: number = 0;
  public city: String = '';
  public state: String = '';
  config: SwiperOptions = {
    slidesPerView: 1, // Slides Visible in Single View Default is 1
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: false,
    autoHeight: true,
  };
  public distancia = 8000;
  public tipos = [];
  public panelOpenState = false;

  constructor(public api: ApiService, private reverso: LocationService) {

  }
  abrirState(tmp) {
    this.panelOpenState = tmp;
    if (!tmp) {
      this.getPromos()
    }
  }
  dataString(data): String {
    return moment(data).format('l')
  }

  ngOnInit() {
    this.setCurrentPosition();
  }
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.reverseGeo(this.latitude, this.longitude);
        this.api.getData('tipos').subscribe(res => {
          this.tipos = res
        })
        this.getPromos()
      });
    }
  }
  getPromos() {
    this.api.getData('promos', { lat: this.latitude, lng: this.longitude, distance: this.distancia }).subscribe(res => {
      this.retorno = res
    })
  }
  reverseGeo(lat, lng) {
    this.reverso.getReverseGeocode(lat, lng).subscribe(location => {
      this.latitude = lat;
      this.longitude = lng;
      this.onAutocompleteSelected(location.results[0])
    })
  }
  onAutocompleteSelected(result: google.maps.places.PlaceResult) {
    const filterResponse = result.address_components.reduce((current, next) => {
      const mapKeys = {
        administrative_area_level_2: 'city',
        administrative_area_level_1: 'state',
      }
      const [validKey] = next.types.filter(key => Object.keys(mapKeys).includes(key))
      if (!validKey) return current
      return {
        ...current,
        [mapKeys[validKey]]: next.long_name
      }
    }, {})
    this.state = filterResponse['state'];
    this.city = filterResponse['city'];
  }
  gotToMaps(latitude, longitude) {
    if (confirm('Abrir Google Maps')) {
      if ((navigator.platform.indexOf("iPhone") != -1) ||
        (navigator.platform.indexOf("iPad") != -1) ||
        (navigator.platform.indexOf("iPod") != -1)) {
        window.open(`maps://maps.google.com/maps?daddr=${latitude},${longitude}&amp;ll=`)
      } else {
        window.open(`https://maps.google.com/maps?daddr=${latitude},${longitude}&amp;ll=`)
      }
    }
  }

}
