"use strict";

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/", (req, res) => {
  try {
    res.status(200).json("Bienvenue sur l'API de Vinted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Import des routes
// USER
const userRoutes = require("./routes/user");
app.use(userRoutes);
// OFFER
const offerRoutes = require("./routes/offer");
app.use(offerRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Non trouvée" });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.error("🔥🔥🔥 Server started 🔥🔥🔥");
});
server.timeout = Number(process.env.SERVER_TIMEOUT) || 1000000;
