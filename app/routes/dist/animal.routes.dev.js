"use strict";

var _require = require("../middlewares"),
    authJwt = _require.authJwt;

var controller = require("../controllers/animal.controller");

var animalController = require("../controllers/animal.controller");

var _require2 = require("../middlewares"),
    animal = _require2.animal;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  }); // Get All Animals

  app.get("/api/animals/all", [authJwt.verifyToken, authJwt.isModerator], controller.getAllAnimals); // Get an Animal based on ID

  app.get("/api/animals", [authJwt.verifyToken], controller.getAnimalFromID); // Post an animal

  app.post("/api/animal/postAnimals", [authJwt.verifyToken], animalController.postAnimals);
};