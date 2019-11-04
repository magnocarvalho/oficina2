import { IUserModel, UserModel } from "../model/User";
import { ObjectId } from "bson";

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
  public static updateUser(req, res, next) {
    let obj: IUserModel = req.body;
    let uid = res.locals.uid;
    UserModel.findOneAndUpdate(
      { uid: uid },
      obj,
      { new: true },
      (err: any, data: any) => {
        if (err) {
          // console.log(err);
          console.log(new Date().toLocaleString(), err.messagem);
          next(err);
        } else res.json(data);
      }
    );
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
          res.json({ error: 405 });
          // res.sendStatus(401);
        } else {
          res.json(data);
        }
      }
    });
  }
  public static findByIdAllPromos(req, res, next) {
    let empresa = req.query.empresa;
    const dateIn = new Date();
    return UserModel.aggregate([
      {
        $match: { _id: new ObjectId(empresa) }
      },
      {
        $lookup: {
          from: "promo",
          localField: "_id",
          foreignField: "createdby",
          as: "promos"
        }
      },
      {
        $match: {
          $and: [
            { "promos.endDate": { $gte: dateIn } },
            { "promos.initDate": { $lt: dateIn } },
          ]
        }
      },
      {
        $lookup: {
          from: "tipo",
          localField: "tipo",
          foreignField: "_id",
          as: "tipo"
        }
      },
      {
        $unwind: "$tipo"
      }
    ],
      (err: any, data: any) => {
        if (err) {
          console.log(err);
          console.log(new Date().toLocaleString(), err.messagem);
          next(err);
        } else res.json(data);
      })
  }
}
export default UserCtrl;
