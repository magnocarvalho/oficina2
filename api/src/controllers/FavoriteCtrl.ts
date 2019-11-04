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
    public static createFavorites(req, res, next) {
        let obj: IFavorite = req.body;
        let uid = res.locals.uid;
        return Favorite.findOneAndUpdate({ uid: uid }, { $set: { "promos.$": obj } }, { new: true }, (err: any, data: any) => {
            if (err) {
                // console.log(err);
                console.log(new Date().toLocaleString(), err.messagem);
                next(err);
            } else res.json(data);
        });
    }
}
export default FavoriteCtrl;
