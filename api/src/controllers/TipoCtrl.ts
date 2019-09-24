import { Tipo } from "../model/Tipo";

class TipoCtrl {
  public static getTipos(req, res, next) {
    return Tipo.find((err: any, data: any) => {
      if (err) {
        console.log(err);
        next(err);
      } else res.json(data);
    });
  }
}
export default TipoCtrl;
