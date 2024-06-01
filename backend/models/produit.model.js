const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  typedeproduit: {
    type: String,
    required: true,
  },
  unite: {
    type: String,
    required: true,
  },
  prix: {
    type: String,
    required: true,
  },
  tva: {
    type: String,
    required: true,
  },
});

const Produit = mongoose.model("Produit", produitSchema);

module.exports = Produit;
