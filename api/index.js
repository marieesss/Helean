const express = require("express");
const fs = require("fs");
const cors = require('cors');


const app = express();

// Middleware pour traiter les données POST au format JSON
app.use(express.json());
app.use(cors())


// Endpoint pour récupérer les données depuis le fichier
app.get("/api/data", (req, res) => {
    // Chemin du fichier de stockage
    const filePath = "data.json";
  
    // Récupération des données à partir du fichier
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error("Erreur lors de la lecture du fichier :", err);
        res.status(500).send("Erreur lors de la lecture du fichier");
      } else {
        const storedData = JSON.parse(data);
        res.status(200).json(storedData);
      }
    });
  });
  
  // Démarrer le serveur
  app.listen(5000, () => {
    console.log("Le serveur est en écoute sur le port 5000...");
  });