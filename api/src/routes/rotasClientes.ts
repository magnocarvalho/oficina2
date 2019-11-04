import * as express from 'express';
import UserCtrl from '../controllers/UserCtrl';
import PromoCtrl from '../controllers/PromoCtrl';
import TipoCtrl from '../controllers/TipoCtrl';
import FavoriteCtrl from '../controllers/FavoriteCtrl';
import firewallbase from '../middleware/firewallbase';


var rotasCliente = express.Router();

rotasCliente.get("/promos:lat?:lng?:distance?", PromoCtrl.getPromos);
//empresa
rotasCliente.get("/empresa:empresa?", UserCtrl.findByIdAllPromos);
// tipo de comercio
rotasCliente.get("/tipos", TipoCtrl.getTipos);
//favoritos
rotasCliente.use("/", firewallbase);
rotasCliente.get("/favorites", FavoriteCtrl.getFavorites);
rotasCliente.post("/favorites", FavoriteCtrl.createFavorites);


export = rotasCliente;