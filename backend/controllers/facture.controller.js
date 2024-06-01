const Facture = require("../models/facture.model"); // Ensure the path is correct

const nodemailer = require("nodemailer");

exports.sendFactureEmail = async (req, res) => {
  try {
    const { email, subject, pdf } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: "75d80a002@smtp-brevo.com",
        pass: "xsmtpsib-195f35379526626fc412f32d8f38b0de2c63fddd517ae31ae0f6eedafa692c20-OMKC41ABTjJYm2xp",
      },
    });

    const mailOptions = {
      from: `"Facture" <contact@facture.com>`,
      to: email,
      subject: subject,
      html: "<p>Please find the attached PDF.</p>",
      attachments: [
        { filename: "facture.pdf", content: pdf, encoding: "base64" },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
};

// Create new facture
exports.createFacture = async (req, res) => {
  try {
    const { numero, date, montantTotal, client, description, status } =
      req.body;

    // Create new facture
    const facture = new Facture({
      numero,
      date,
      montantTotal,
      client,
      description,
      status, // Add status here
    });

    await facture.save();
    res.status(201).json(facture);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all factures
exports.getAllFactures = async (req, res) => {
  try {
    const factures = await Facture.find();
    res.json(factures);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get facture by ID
exports.getFactureById = async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id);
    if (!facture) {
      return res.status(404).json({ msg: "Facture not found" });
    }
    res.json(facture);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update facture
exports.updateFacture = async (req, res) => {
  try {
    const { numero, date, montantTotal, client, description, status } =
      req.body;

    const facture = await Facture.findById(req.params.id);
    if (!facture) {
      return res.status(404).json({ msg: "Facture not found" });
    }

    if (numero) facture.numero = numero;
    if (date) facture.date = date;
    if (montantTotal) facture.montantTotal = montantTotal;
    if (client) facture.client = client;
    if (description) facture.description = description;
    if (status) facture.status = status; // Add status here

    await facture.save();
    res.json(facture);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete facture
exports.deleteFacture = async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id);
    if (!facture) {
      return res.status(404).json({ msg: "Facture not found" });
    }

    await facture.remove();
    res.json({ msg: "Facture removed" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
