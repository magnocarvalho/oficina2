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
  fotoThumbAplicado: boolean;
  imagemPerfil: any = "/assets/img500x.png";

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
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
    // var foto = this.fotoThumb;
    // if (event.file) {
    //   foto.file = event.file;
    //   this.fotoThumb.url = event.base64;
    //   this.form.get('thumbnail').setValue(event.base64);
    // }
  }
  removeThumb(e) {
    e.preventDefault();
    // (<any>document.getElementById('filethumb')).value = "";
    // this.fotoThumb = {};
    // this.fileChangeEventThumb(null);
  }

  aplicarFotoThumb() {
    // this.fotoThumbAplicado = true;
    // console.log(this.fotoThumb.url)
  }

  retirarFotoThumb() {
    // this.fotoThumb = {};
    // this.form.get('thumbnail').setValue(null);
    // this.fotoThumbAplicado = false;
  }
  rotateLeft(e) {
    e.preventDefault();

    // this.imageCropper.rotateLeft();
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
  salvar() {
    var tmp: Promo = this.form.value
    console.log(tmp)
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

}
