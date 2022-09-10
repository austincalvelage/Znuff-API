const config = require("../config/auth.config");
const db = require("../models");
const Animal = db.animal;
const User = db.user;
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
let datetime = new Date().toISOString().slice(0, 19);
// const locationID = navigator.geolocation.watchPosition((position) => {
//   return position.coords.latitude, position.coords.longitude;
// });

// Add Animal
exports.postAnimals = (req, res) => {
  const animal = new Animal({
    type: req.body.type,
    posted: datetime,
    name: req.body.name,
    // images: {
    //   data: Buffer,
    //   contentType: String,
    // },
    location: req.body.location,
    age: req.body.age,
    genre: req.body.genre,
    breed: req.body.breed,
    characteristics: {
      easyToGroom: req.body.characteristics.groom,
      dogFriendly: req.body.characteristics.dogFriendly,
      catFriendly: req.body.characteristics.catFriendly,
      houseTrained: req.body.characteristics.houseTrained,
      leashTrained: req.body.characteristics.leashTrained,
      goodWithKids: req.body.characteristics.goodWithKids,
      energyLevel: req.body.characteristics.energyLevel,
      vocality: req.body.characteristics.vocalityLevel,
    },
    medicalInfo: {
      vaccinated: req.body.medicalInfo.vaccinated,
      neutured: req.body.medicalInfo.neutured,
      shortHair: req.body.medicalInfo.shortHair,
      allergyFriendly: req.body.medicalInfo.allergyFriendly,
      diaryRestrictions: req.body.medicalInfo.diaryRestrictions,
      needsMedication: req.body.medicalInfo.needsMedication,
      disability: req.body.medicalInfo.disability,
      spayed: req.body.medicalInfo.spayed,
    },
    story: req.body.story,
    poster: {
      id: req.body.poster.id,
      number: req.body.poster.number,
      contactChannels: [req.body.poster.number],
      posterType: req.body.poster.type,
    },
  });

  User.findOne({ id: req.body.poster.id }, (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    // Add user _id to animalPost poster
    animal.poster.name = user.username;
    animal.poster.userSince = user.userSince;
    animal.poster.email = user.email;
    animal.poster.contactChannels = [
      ...animal.poster.contactChannels,
      user.email,
    ];
    animal.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    });

    // Update user post array with animalPost _id
    user.posts = [...user.posts, animal._id];
    user.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send(
        `Report: \n 1. Updating User postsArray with animalID was successfully! \n
         2. postAnimal successfully sent \n ${JSON.stringify(animal, null, 4)}`
      );
    });
  });
};

// Get All Animals
exports.getAllAnimals = (req, res) => {
  Animal.find()
    .then((animal) => {
      res.status(201).json(animal);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error: " + err);
    });
};

// Get Animal by id
exports.getAnimalByID = (req, res) => {
  Animal.findOne({
    _id: { $in: req.params.id },
  })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch(() => {
      return res
        .status(404)
        .send({ message: `ID not found for ${req.body.id}` });
    });
};
