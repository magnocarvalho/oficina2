import { TypeMasterSchema, TypeComercio } from "../model/typecomercio";

class TipoCtrl {
  public static getTipos(req, res, next) {
    return TypeComercio.find((err: any, data: any) => {
      if (err) {
        console.log(err);
        next(err);
      } else res.json(data);
    });
  }
}
export default TipoCtrl;
