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
        console.log(decodedToken.name);
        // res.locals.user = decodedToken;
        res.locals.uid = decodedToken.uid
        next();
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(401);
      });
  } else {
    console.log("Authorization header is not found");
    res.sendStatus(405);
  }
}
