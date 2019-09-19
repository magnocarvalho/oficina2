import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { ImgUploadService } from "./img-upload.service";
import { Observable } from "rxjs";
import { User } from "../model/user";

@Injectable({
  providedIn: "root"
})
export class AuthfireService {
  user: Observable<firebase.User>;
  userData: User = {
    uid: "",
    email: "",
    displayName: "",
    photoURL: "",
    emailVerified: undefined
  };

  constructor(
    public afAuth: AngularFireAuth,
    public imgUpload: ImgUploadService
  ) {
    afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    this.user = afAuth.authState;
    this.user.subscribe(user => {
      this.userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      };
      console.log(this.userData);
    });
  }

  doUserDados() {
    return this.afAuth.auth.currentUser;
  }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth.signInWithPopup(provider).then(
        res => {
          resolve(res);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  doRegister(value, arquivoImg) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.pass)
        .then(res => {
          this.doCheckEmail()
            .then(email => {
              console.log("email", email);
              this.imgUpload
                .uploadPerfilImagem(arquivoImg, res.user.uid)
                .then(img => {
                  console.log(img);
                  this.doUpdateUser(value.name, img.caminhoImagem)
                    .then(useUpdate => {
                      resolve(this.afAuth.auth.currentUser);
                    })
                    .catch(updateErro => {
                      console.log("Erro Update perfil do usuario", updateErro);
                      reject(updateErro);
                    });
                })
                .catch(imgErro => {
                  console.log("Erro uploadImg do usuario", imgErro);
                  reject(imgErro);
                });
            })
            .catch(errEmail => {
              console.log("Erro Check Email do usuario", errEmail);
              reject(errEmail);
            });
        })
        .catch(err => {
          console.log("Erro Criar usuario", err);
          reject(err);
        });
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            resolve(res);
          },
          err => reject(err)
        );
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }

  doUpdateUser(displayName, photoURL) {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.currentUser
          .updateProfile({ displayName, photoURL })
          .then(criar => resolve(criar))
          .catch(erro => reject(erro));
      } else {
        reject("usario invalido");
      }
    });
  }

  doCheckEmail() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.currentUser.sendEmailVerification();
        resolve();
      } else {
        reject();
      }
    });
  }
}
