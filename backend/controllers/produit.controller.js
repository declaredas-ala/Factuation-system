const Produit = require("../models/produit.model"); // Assurez-vous que le chemin est correct

// Create new produit
exports.createProduit = async (req, res) => {
  try {
    const { nom, typedeproduit, unite, prix, tva } = req.body;

    // Create new produit
    const produit = new Produit({
      nom,
      typedeproduit,
      unite,
      prix,
      tva,
    });

    await produit.save();
    res.status(201).json(produit);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all produits
exports.getAllProduits = async (req, res) => {
  try {
    const produits = await Produit.find();
    res.json(produits);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get produit by ID
exports.getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) {
      return res.status(404).json({ msg: "Produit not found" });
    }
    res.json(produit);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update produit
exports.updateProduit = async (req, res) => {
  try {
    const { nom, typedeproduit, unite, prix, tva } = req.body;

    const produit = await Produit.findById(req.params.id);
    if (!produit) {
      return res.status(404).json({ msg: "Produit not found" });
    }

    if (nom) produit.nom = nom;
    if (typedeproduit) produit.typedeproduit = typedeproduit;
    if (unite) produit.unite = unite;
    if (prix) produit.prix = prix;
    if (tva) produit.tva = tva;

    await produit.save();
    res.json(produit);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete produit
exports.deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) {
      return res.status(404).json({ msg: "Produit not found" });
    }

    await produit.remove();
    res.json({ msg: "Produit removed" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
