import * as express from 'express';
import UserCtrl from '../controllers/UserCtrl';
import PromoCtrl from '../controllers/PromoCtrl';
import TipoCtrl from '../controllers/TipoCtrl';


var rotasPublicas = express.Router();

rotasPublicas.get("/promos:lat?:lng?:distance?", PromoCtrl.getPromos);
// tipo de comercio
rotasPublicas.get("/tipos", TipoCtrl.getTipos);

export = rotasPublicas;