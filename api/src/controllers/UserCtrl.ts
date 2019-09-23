import { UserModel, IUserModel } from "../model/user";

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
    let obj = req.body;
    console.log(obj);
    UserModel.findOne({ uid: obj }, (err: any, data: any) => {
      if (err) {
        console.log(err);
        next(err);
      } else res.json(data);
    });
  }
}
export default UserCtrl;
