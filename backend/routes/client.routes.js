const express = require("express");
const clientController = require("../controllers/client.controller"); // Assurez-vous que le chemin est correct
const auth = require("../middlewares/auth"); // Utiliser le middleware d'authentification si nécessaire

const router = express.Router();

// Define routes for clients
router.get("/", clientController.getAllClients);
router.post("/", clientController.createClient);
router.get("/:id", clientController.getClientById);
router.put("/:id", clientController.updateClient);
router.delete("/:id", clientController.deleteClient);

module.exports = router;
