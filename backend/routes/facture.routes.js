const express = require("express");
const factureController = require("../controllers/facture.controller"); // Assurez-vous que le chemin est correct
const auth = require("../middlewares/auth"); // Utiliser le middleware d'authentification si nécessaire

const router = express.Router();
router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept",
    "set-cookie",
    "Access-Control-Allow-Origin: *"
  );
  next();
});

// Define routes for factures
router.get("/", factureController.getAllFactures);
router.post("/", factureController.createFacture);
router.get("/:id", factureController.getFactureById);
router.put("/:id", factureController.updateFacture);
router.delete("/:id", factureController.deleteFacture);
router.post("/send-email", factureController.sendFactureEmail);

module.exports = router;
