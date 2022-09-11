const mongoose = require("mongoose");
const Animal = mongoose.model(
  "Animal",
  new mongoose.Schema({
    type: String,
    posted: Date,
    name: String,
    // location: String,
    // images: {
    //   data: Buffer,
    //   contentType: String,
    // },
    image: String,
    location: String,
    age: Number,
    genre: String,
    breed: String,
    characteristics: {
      easyToGroom: Boolean,
      dogFriendly: Boolean,
      catFriendly: Boolean,
      houseTrained: Boolean,
      leashTrained: Boolean,
      goodWithKids: Boolean,
      energyLevel: Number,
      vocality: Number,
    },
    medicalInfo: {
      vaccinated: Boolean,
      neutured: Boolean,
      shortHair: Boolean,
      allergyFriendly: Boolean,
      diaryRestrictions: Boolean,
      needsMedication: Boolean,
      disability: Boolean,
      spayed: Boolean,
    },
    story: String,
    poster: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: { type: mongoose.Schema.Types.String, ref: "User" },
      profilePic: {
        data: Buffer,
        contentType: String,
      },
      userSince: { type: mongoose.Schema.Types.Date, ref: "User" },
      number: Number,
      email: String,
      contactChannels: [String],
      posterType: String,
    },
  })
);
module.exports = Animal;
