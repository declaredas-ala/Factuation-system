const express = require("express");
const devisController = require("../controllers/devis.controller"); // Assurez-vous que le chemin est correct
const auth = require("../middlewares/auth"); // Utiliser le middleware d'authentification si nécessaire

const router = express.Router();

// Define routes for devis
router.get("/", devisController.getAllDevis);
router.post("/", devisController.createDevis);
router.get("/:id", devisController.getDevisById);
router.put("/:id", devisController.updateDevis);
router.delete("/:id", devisController.deleteDevis);

module.exports = router;
