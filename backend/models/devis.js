const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produit",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
});

const devisSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  montantTotal: {
    type: Number,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  produits: [productSchema],
});

const Devis = mongoose.model("Devis", devisSchema);

module.exports = Devis;
