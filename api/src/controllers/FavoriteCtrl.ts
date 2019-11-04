import { Favorite, IFavorite } from "../model/Favorite";

class FavoriteCtrl {
    public static getFavorites(req, res, next) {
        return Favorite.find((err: any, data: any) => {
            if (err) {
                console.log(err);
                console.log(new Date().toLocaleString(), err.messagem);
                next(err);
            } else res.json(data);
        });
    }
    public static async createFavorites(req, res, next) {
        let obj = req.body;
        let uid = res.locals.uid;
        // console.log(uid, obj)
        let procura: IFavorite = await Favorite.findOne({ uid: uid });
        if (procura) {
            if (procura.promos.find(a => {
                // console.log(a)
                return a.id == obj.id
            })) {
                // console.log(procura)
                res.json(procura)
            } else {
                return Favorite.findOneAndUpdate({ uid: uid }, { $addToSet: { promos: obj } }, { new: true }, (err: any, data: any) => {
                    if (err) {
                        console.log(err);
                        console.log(new Date().toLocaleString(), err.messagem);
                        next(err);
                    } else res.json(data);
                });
            }
        } else {
            return Favorite.create({ uid: uid, promos: [obj] }, (err: any, data: any) => {
                if (err) {
                    console.log(err);
                    console.log(new Date().toLocaleString(), err.messagem);
                    next(err);
                } else res.json(data);
            });
        }
    }
}
export default FavoriteCtrl;
