import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { Promo } from 'src/app/model/promo';
import 'moment/locale/pt-br';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { priceValidator } from 'src/app/validator/priceValidator';
import { ImgUploadService } from 'src/app/services/img-upload.service';
import { AuthfireService } from 'src/app/services/authfire.service';

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
  mes = moment().add(1, 'months');
  fotoThumb: String;
  fotoThumbAplicado: boolean = false;
  imagemPerfil: any = "/assets/img500x.png";
  valorMenor: Number = 0;
  uid: String;
  constructor(private formBuilder: FormBuilder, public imagemUpload: ImgUploadService, public authApi: AuthfireService) {
    authApi.user.subscribe(res => {
      this.uid = res.uid
    });
  }

  ngOnInit() {
    moment.locale('pt-br')
    this.form = this.formBuilder.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      about: ["", [Validators.required, Validators.minLength(2)]],
      initPrice: [0, [Validators.required, Validators.min(1)]],
      endPrice: [0, [Validators.required, Validators.min(1)]],
      initDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      thumbnail: ["", [Validators.required]],
      descont: [{ value: "", disabled: true }, [Validators.required]]
    }, {
      validators: priceValidator('initPrice', 'endPrice', 'descont')
    })
  }
  consultDescont(): String {
    let tmp = (this.form.get('initPrice').value - this.form.get('endPrice').value) / this.form.get('initPrice').value;
    if (tmp) {
      return parseFloat('' + tmp * 100).toFixed(2) + "%";
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
    this.fotoThumb = null;
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
    if (this.fotoThumb) {
      console.log(this.fotoThumb.substring(0, 30), this.uid, tmp.title)
      this.imagemUpload.uploadFoto(this.fotoThumb, this.uid, tmp.title).then(ress => {
        console.log('responsta ', ress)
        tmp.thumbnail = ress;
      })

    }


    if (this.form.valid) {
    }
    console.log(this.uid, tmp)

  }

}
