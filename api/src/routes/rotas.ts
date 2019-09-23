import * as express from 'express';
import UserCtrl from '../controllers/UserCtrl';


var router = express.Router();

router.post("/user", UserCtrl.createUser);

export = router;