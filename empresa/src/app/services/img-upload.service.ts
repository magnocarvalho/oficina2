import { Injectable } from "@angular/core";
import { Upload } from "../model/upload";
import * as firebase from "firebase/app";
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable({
  providedIn: "root"
})
export class ImgUploadService {
  imagem: Upload = {
    complete: false,
    caminhoImagem: "",
    downloadURL: null,
    task: null,
    uploadPercent: null
  };
  constructor(private storage: AngularFireStorage) {
    this.imagem.complete = false;
    this.imagem.caminhoImagem = "";
    this.imagem.downloadURL = null;
    this.imagem.task = null;
  }

  uploadPerfilImagem(file, uid) {
    this.imagem.complete = false;
    let path = `perfil/${uid}/${file.name}`;
    let fileRef = this.storage.ref(path.replace(/\s/g, ""));
    this.imagem.task = this.storage.upload(path.replace(/\s/g, ""), file);
    // this.imagem.uploadPercent = this.imagem.task.percentageChanges();
    return new Promise<any>((resolve, reject) => {
      this.imagem.task.then(up => {
        fileRef.getDownloadURL().subscribe(
          url => {
            this.imagem.complete = true;
            this.imagem.caminhoImagem = url;
            resolve(this.imagem);
          },
          erroImg => {
            console.log(erroImg);
            reject(erroImg);
          }
        );
      });
    });
  }
}
