import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
//rotas publicas e privadas
import * as admin from "firebase-admin";
import moment = require('moment');
import router from "./routes/rotasEmpresas";
import rotasCliente from "./routes/rotasClientes";

require("dotenv").config();
var cors = require("cors");
var app = express();
moment.locale('pt-BR');

app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false); // biblioteca depreciada
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("🚀 Mongo DB inicializado com sucesso as", moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
  });

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.header("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', "*");

  // Pass to next layer of middleware
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "PUT, POST, DELETE, GET, PATCH"
  // );
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
  // res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  // );
  next();
});

app.options("*", function (req, res, next) {
  if (req.method == "OPTIONS")
    // res.status(200);
    res.sendStatus(200);
});
// app.use("") //static
app.use("/public", rotasCliente); //clientes
app.use("/api", router); //rotas empresa

app.use(function (req, res, next) {
  let err: any;
  err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong. Please try again",
    status: err.status || 500
  });
});

if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

var port = process.env.PORT || 1337;

try {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: `https://oficina2utfpr.firebaseio.com`
  });
  console.log("🚀 Server app firebase iniciado");
} catch (e) {
  console.log("🚀 Server app firebase falhou : ", e);
}
app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}/api`);
});
