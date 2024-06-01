const mongoose = require("mongoose");

const factureSchema = new mongoose.Schema({
  numero: {
    type: String,
  },
  date: {
    type: Date,
  },
  montantTotal: {
    type: Number,
  },
  client: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "paid", "cancelled"], // Define possible statuses
    default: "pending",
  },
});

const Facture = mongoose.model("Facture", factureSchema);

module.exports = Facture;
