import { Promo, IPromo } from "../model/Promo";
import { UserModel } from "../model/User";

class PromoCtrl {
  public static getPromos(req, res, next) {
    let lat: Number = parseFloat(req.query.lat);
    let lng: Number = parseFloat(req.query.lng);
    let coordinates = [lat, lng];
    let distance = req.query.distance;
    const dateIn = new Date();
    // console.log([lat, lng, distance]);

    return UserModel.aggregate(
      [
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: coordinates
            },
            distanceField: "dist.calculated",
            maxDistance: distance,
            spherical: true
          }
        },
        {
          $match: {
            location: {
              $geoWithin: {
                $centerSphere: [coordinates, distance / 1609.34 / 3963.2]
              }
            }
          }
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
              { "promos.initDate": { $lt: dateIn } }
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
      }
    );
  }
  public static createPromo(req, res, next) {
    let obj: IPromo = req.body;
    return Promo.create(obj, (err: any, data: any) => {
      if (err) {
        // console.log(err);
        console.log(new Date().toLocaleString(), err.messagem);
        next(err);
      } else res.json(data);
    });
  }
  public static getPromosIdUser(req, res, next) {
    let idUser = req.query.empresa;
    return Promo.find({ createdby: idUser }, (err: any, data: any) => {
      if (err) {
        // console.log(err);
        console.log(new Date().toLocaleString(), err.messagem);
        next(err);
      } else res.json(data);
    });
  }
}
export default PromoCtrl;
