import { IUserModel, UserModel } from "../model/User";

var admin = require("firebase-admin");
class UserCtrl {
  public static createUser(req, res, next) {
    let obj: IUserModel = req.body;
    UserModel.create(obj, (err: any, data: any) => {
      if (err) {
        // console.log(err);
        console.log(new Date().toLocaleString(), err.messagem);
        next(err);
      } else res.json(data);
    });
  }
  public static findUserUID(req, res, next) {
    let uid = res.locals.uid;
    // console.log(uid);
    UserModel.findOne({ uid: uid }, (err: any, data: any) => {
      if (err) {
        // console.log(err);
        console.log(new Date().toLocaleString(), err.messagem);
        next(err);
      } else {
        // console.log(data);
        if (data == undefined) {
          // res.json({error: 'Usuario nao encontrado'})
          res.sendStatus(405);
        } else {
          res.json(data);
        }
      }
    });
  }
}
export default UserCtrl;
