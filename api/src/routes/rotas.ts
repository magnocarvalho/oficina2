import * as express from 'express';
import UserCtrl from '../controllers/UserCtrl';


var router = express.Router();

router.post("/user", UserCtrl.createUser);
router.get("/user", UserCtrl.findUserUID);

export = router;