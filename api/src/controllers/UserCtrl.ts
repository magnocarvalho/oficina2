import { UserModel, IUserModel } from "../model/user";
var admin = require("firebase-admin");
class UserCtrl {
  public static createUser(req, res, next) {
    let obj: IUserModel = req.body;
    UserModel.create(obj, (err: any, data: any) => {
      if (err) {
        console.log(err);
        next(err);
      } else res.json(data);
    });
  }
  public static findUserUID(req, res, next) {
    let uid = res.locals.uid;
    // console.log(uid);
    UserModel.findOne({ uid: uid }, (err: any, data: any) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        // console.log(data);
        if (data == undefined) {
          res.sendStatus(404);
        } else {
          res.json(data);
        }
      }
    });
  }
}
export default UserCtrl;
