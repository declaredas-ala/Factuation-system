const Client = require("../models/client.model"); // Assurez-vous que le chemin est correct

// Créer un nouveau client
exports.createClient = async (req, res) => {
  try {
    const { nom, prenom, numtele, cin, email, adresse } = req.body;

    // Créer un nouveau client
    const client = new Client({
      nom,
      prenom,
      numtele,
      cin,
      email,
      adresse,
    });

    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ msg: "Erreur du serveur" });
  }
};

// Récupérer tous les clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ msg: "Erreur du serveur" });
  }
};

// Récupérer un client par ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ msg: "Client non trouvé" });
    }
    res.json(client);
  } catch (err) {
    res.status(500).json({ msg: "Erreur du serveur" });
  }
};

// Mettre à jour un client
exports.updateClient = async (req, res) => {
  try {
    const { nom, prenom, numtele, cin, email, adresse } = req.body;

    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ msg: "Client non trouvé" });
    }

    if (nom) client.nom = nom;
    if (prenom) client.prenom = prenom;
    if (numtele) client.numtele = numtele;
    if (cin) client.cin = cin;
    if (email) client.email = email;
    if (adresse) client.adresse = adresse;

    await client.save();
    res.json(client);
  } catch (err) {
    res.status(500).json({ msg: "Erreur du serveur" });
  }
};

// Supprimer un client
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ msg: "Client non trouvé" });
    }

    await client.remove();
    res.json({ msg: "Client supprimé" });
  } catch (err) {
    res.status(500).json({ msg: "Erreur du serveur" });
  }
};
const nodemailer = require("nodemailer");

// Send email route
exports.sendFactureEmail = async (req, res) => {
  const { facture, clientId } = req.body;

  try {
    const client = await Client.findById(clientId);
    if (!client || !client.email) {
      return res.status(404).json({ msg: "Client or client email not found" });
    }

    // Create a transporter
    let transporter = nodemailer.createTransport({
      service: "gmail", // utilisez le service de votre choix
      auth: {
        user: "your-email@gmail.com", // votre adresse email
        pass: "your-email-password", // votre mot de passe
      },
    });

    // Email options
    let mailOptions = {
      from: "your-email@gmail.com",
      to: client.email,
      subject: `Facture ${facture.numero}`,
      text: `Veuillez trouver ci-joint la facture ${facture.numero}.`,
      attachments: [
        {
          filename: `Facture_${facture._id}.pdf`,
          content: Buffer.from(facture.pdf, "base64"),
          contentType: "application/pdf",
        },
      ],
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ msg: "Error sending email", error });
      }
      res.status(200).json({ msg: "Email sent successfully", info });
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};
