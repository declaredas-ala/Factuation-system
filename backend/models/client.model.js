const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  numtele: {
    type: Number,
  },
  cin: {
    type: Number,
  },
  email: {
    type: String,
  },
  adresse: {
    type: String,
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
