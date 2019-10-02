import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Promo } from 'src/app/model/promo';
import 'moment/locale/pt-br';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-new-promo',
  templateUrl: './new-promo.component.html',
  styleUrls: ['./new-promo.component.css']
})
export class NewPromoComponent implements OnInit {
  form: FormGroup;
  imageChangedEventThumb: any = '';
  @ViewChild("cropthumb", { static: false }) imageCropper: ImageCropperComponent;
  day = moment();
  mes = moment();
  fotoThumb: any = {};
  fotoThumbAplicado: boolean = false;
  imagemPerfil: any = "/assets/img500x.png";

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    moment.locale('pt-br')
    this.form = this.formBuilder.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      about: ["", [Validators.required, Validators.minLength(2)]],
      initDate: [moment(), [Validators.required]],
      endDate: [moment(), [Validators.required]],
      thumbnail: [null, [Validators.required]],
    })
  }

  fileChangeEventThumb(event: any): void {
    this.imageChangedEventThumb = event;
  }
  onFileChange(event: ImageCroppedEvent) {

    if (event.base64) {
      this.fotoThumb = event.base64;
    }
  }
  removeThumb() {
    this.fotoThumbAplicado = false;
    this.fotoThumb = null;
  }

  aplicarFotoThumb() {
    this.fotoThumbAplicado = true;
  }
  retirarFotoThumb() {
    this.fotoThumbAplicado = false;
    this.imageChangedEventThumb = null;

  }

  rotateLeft(e) {
    e.preventDefault();
    this.imageCropper.rotateLeft();
  }
  rotateRight(e) {
    e.preventDefault();
    this.imageCropper.rotateRight();
  }
  flipHorizontal(e) {
    e.preventDefault();
    this.imageCropper.flipHorizontal();
  }
  flipVertical(e) {
    e.preventDefault();
    this.imageCropper.flipVertical();
  }

  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
  salvar() {
    var tmp: Promo = this.form.value
    console.log(tmp)
  }

}
