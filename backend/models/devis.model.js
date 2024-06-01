const mongoose = require("mongoose");

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
  description: {
    type: String, // Ajout du champ description
    required: true,
  },
});

const Devis = mongoose.model("Devis", devisSchema);

module.exports = Devis;
