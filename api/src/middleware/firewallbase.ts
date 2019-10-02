import moment = require("moment");

const admin = require.main.require("firebase-admin");

export default function firewallbase(req, res, next) {
  const authorization = req.header("Authorization");
  //   console.log(authorization);
  if (authorization) {
    let token = authorization.split(" ");
    admin
      .auth()
      .verifyIdToken(token[1])
      .then(decodedToken => {
        var logs = `Requisição feita pela empresa ${
          decodedToken.name
        } com email ${decodedToken.email} as ${moment().format(
          "h:mm:ss:S a"
        )} ${req.originalUrl} ${req.ip} ${req.ips}
        `;
        // console.log(logs);
       
        // res.locals.user = decodedToken;
        res.locals.uid = decodedToken.uid;
        next();
      })
      .catch(err => {
     
        console.log("error", err.messagem);
        res.sendStatus(401);
      });
  } else {
    console.log("Authorization header is not found");
    res.sendStatus(405);
  }
}
