import { Injectable } from "@angular/core";
import { Upload } from "../model/upload";
import * as firebase from "firebase/app";
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/storage";
import { AuthfireService } from './authfire.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { UploadTask } from '@angular/fire/storage/interfaces';

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
  constructor(private storage: AngularFireStorage, public loadServ: LoadingBarService) {
    this.imagem.complete = false;
    this.imagem.caminhoImagem = "";
    this.imagem.downloadURL = null;
    this.imagem.task = null;
  }

  uploadPerfilImagem(file, uid) {
    this.loadServ.start()
    this.imagem.complete = false;
    let path = `perfil/${uid}/${file.name}`;
    let fileRef = this.storage.ref(path.replace(/\s/g, ""));
    this.imagem.task = this.storage.upload(path.replace(/\s/g, ""), file);
    // this.imagem.uploadPercent = this.imagem.task.percentageChanges();
    return new Promise<any>((resolve, reject) => {
      this.imagem.task.then(up => {
        fileRef.getDownloadURL().subscribe(
          url => {
            console.log(url);
            this.imagem.complete = true;
            this.imagem.caminhoImagem = url;
            this.loadServ.complete()
            resolve(this.imagem);
          },
          erroImg => {
            console.log(erroImg);
            this.loadServ.complete()
            reject(erroImg);
          }
        );
      });
    });
  }
  uploadFoto(base64, uid, titulo) {
    this.loadServ.start()
    let path = `promocao/${uid}/${titulo}`;
    let fileRef = this.storage.ref(path.replace(/\s/g, ""));
    let taksUpload = fileRef.putString(base64, 'data_url');
    return new Promise<any>((resolve, reject) => {
      taksUpload.task.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        this.loadServ.set((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        if (snapshot.state == "sucess") {
          console.log('Uploaded a data_url string!', snapshot.downloadURL);
        }
      }, erro => {
        console.log('Falhou o upload')
        alert('Falha ao fazer o upload da sua imagem, tente novamente mais tarde')
        this.loadServ.complete()
        reject(erro)
      }, () => {
        taksUpload.task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL);
          resolve(downloadURL)
        });
      })
    })
  }
}
