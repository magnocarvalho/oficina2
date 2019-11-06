import { IUserModel, UserModel } from "../model/Empresa";
import { ObjectId } from "bson";
import { IFavorite } from "../model/Favorite";
import { IPromo } from "../model/Promo";

var admin = require("firebase-admin");
class UserCtrl {
  public static createUser(req, res, next) {
    let obj: IUserModel = req.body;
    UserModel.create(obj, (err: any, data: any) => {
      if (err) {
        // console.log(err);
        //  console.log(new Date().toLocaleString(), err.messagem);
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
          //  console.log(new Date().toLocaleString(), err.messagem);
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
        //  console.log(new Date().toLocaleString(), err.messagem);
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
    let uid = res.locals.uid;
    console.log(uid, empresa);
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
            { "promos.isDeleted": false }
          ]
        }
      },
      {
        $lookup: {
          from: "favorite",
          let: { uid: uid },
          pipeline: [
            { $match: { uid: uid } }],
          as: "favorites"
        }
      },
      {
        $unwind: "$favorites"
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
      async (err: any, data: any) => {

        if (err) {
          console.log(err);
          //  console.log(new Date().toLocaleString(), err.messagem);
          next(err);
        } else {
          console.log(data.length, 'busca funcionou', new Date())
          try {
            if (data[0].promos) {
              let favorite: IFavorite = await data[0].favorites
              let promocoes: IPromo[] = await data[0].promos;
              //  console.log(favorite)
              data[0].promos = promocoes.map(p => {
                for (let i = 0; i < favorite.promos.length; i++) {
                  // console.log(favorite.promos[i].id, p._id, favorite.promos[i].id.toString() == p._id.toString())
                  if (favorite.promos[i].id.toString() == p._id.toString()) {
                    p.favorito = true
                    return p
                  } else {
                    p.favorito = false
                  }
                }
                return p
              })
            }
            res.json(data);
          } catch (error) {
            next(error);
          }


        }
      })
  }
}
export default UserCtrl;
