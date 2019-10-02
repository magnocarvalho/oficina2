import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { Promo } from 'src/app/model/promo';
import 'moment/locale/pt-br';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { priceValidator } from 'src/app/validator/priceValidator';
import { ImgUploadService } from 'src/app/services/img-upload.service';

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
  valorMenor: Number = 0;
  constructor(private formBuilder: FormBuilder, public imagemUpload: ImgUploadService) {

  }

  ngOnInit() {
    moment.locale('pt-br')
    this.form = this.formBuilder.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      about: ["", [Validators.required, Validators.minLength(2)]],
      initPrice: [0, [Validators.required, Validators.min(1)]],
      endPrice: [0, [Validators.required, Validators.min(1)]],
      initDate: [moment(), [Validators.required]],
      endDate: [moment(), [Validators.required]],
      thumbnail: ["", [Validators.required]],
      descont: [{ value: "", disabled: true }, [Validators.required]]
    }, {
      validators: priceValidator('initPrice', 'endPrice', 'descont')
    })
  }
  consultDescont(): String {
    let tmp = (this.form.get('endPrice').value / this.form.get('initPrice').value) * 100;
    if (tmp) {
      return parseFloat('' + tmp).toFixed(2) + "%";
    } else {
      return 'Porcentagem Invalida'
    }

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
    if (this.form.valid) {
      // this.imagemUpload.uploadFoto()
    }
    console.log(tmp)

  }

}
