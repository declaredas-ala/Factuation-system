const express = require("express");
const mongoose = require("mongoose");
const clientRoutes = require("./routes/client.routes");
const produitRoutes = require("./routes/produit.routes");
const factureRoutes = require("./routes/facture.routes");
const devisRoutes = require("./routes/devis.routes");
const userRoutes = require("./routes/user.routes"); // Make sure the file name is correct
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  "mongodb+srv://ala:ala123@cluster0.tojwjkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Correct origin without wildcard
    credentials: true, // Allow credentials
    optionsSuccessStatus: 200,
  })
);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/api/clients", clientRoutes);
app.use("/api/produits", produitRoutes);
app.use("/api/factures", factureRoutes);
app.use("/api/devis", devisRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
