const Devis = require("../models/devis.model");

// Create new devis
exports.createDevis = async (req, res) => {
  try {
    const { numero, date, montantTotal, client, description } = req.body;

    // Create new devis
    const devis = new Devis({
      numero,
      date,
      montantTotal,
      client,
      description,
    });

    await devis.save();
    res.status(201).json(devis);
  } catch (err) {
    console.error("Error creating devis:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all devis
exports.getAllDevis = async (req, res) => {
  try {
    const devis = await Devis.find().populate("client");
    res.json(devis);
  } catch (err) {
    console.error("Error fetching devis:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get devis by ID
exports.getDevisById = async (req, res) => {
  try {
    const devis = await Devis.findById(req.params.id).populate("client");
    if (!devis) {
      return res.status(404).json({ msg: "Devis not found" });
    }
    res.json(devis);
  } catch (err) {
    console.error("Error fetching devis by ID:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update devis
exports.updateDevis = async (req, res) => {
  try {
    const { numero, date, montantTotal, client, description } = req.body;

    const devis = await Devis.findById(req.params.id);
    if (!devis) {
      return res.status(404).json({ msg: "Devis not found" });
    }

    if (numero) devis.numero = numero;
    if (date) devis.date = date;
    if (montantTotal) devis.montantTotal = montantTotal;
    if (client) devis.client = client;
    if (description) devis.description = description;

    await devis.save();
    res.json(devis);
  } catch (err) {
    console.error("Error updating devis:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete devis
exports.deleteDevis = async (req, res) => {
  try {
    const devis = await Devis.findById(req.params.id);
    if (!devis) {
      return res.status(404).json({ msg: "Devis not found" });
    }

    await devis.remove();
    res.json({ msg: "Devis removed" });
  } catch (err) {
    console.error("Error deleting devis:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
