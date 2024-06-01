const express = require("express");
const produitController = require("../controllers/produit.controller"); // Assurez-vous que le chemin est correct
const auth = require("../middlewares/auth"); // Utiliser le middleware d'authentification si nécessaire

const router = express.Router();

// Define routes for produits
router.get("/", produitController.getAllProduits);
router.post("/", produitController.createProduit);
router.get("/:id", produitController.getProduitById);
router.put("/:id", produitController.updateProduit);
router.delete("/:id", produitController.deleteProduit);

module.exports = router;
