const express = require("express");
const router = express.Router();
const livresData = require("../data/livresCopy.json");
const { check, validationResult } = require("express-validator");
const { save } = require("../services/save.service");
const Livre = require("../models/livre");

router.get("/", (req, res) => {
  res.json(livresData);
});
router.post(
  "/",
  [
    check("titre", "le titre du livre est obligatoire").not().isEmpty(),
    check("auteur", "l'auteur du livre est obligatoire").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    //ajout d'un livre puisqu'il nya pas d'erreur

    const { titre, auteur } = req.body;
    const newLivre = new Livre(titre, auteur);

    livresData.push({ ...newLivre });
    //on doit sauvegarder l'ajout
    const isSaved = save(livresData);
    if (!isSaved) {
      return res.status(500).json({
        error: true,
        message: "impossible d'enregistrer Livres",
      });
    }
    res.json({
      message: "Succès",
      livre: newLivre,
    });
  }
);

router.put(
  "/:id",
  [
    check("titre", "le titre du livre est obligatoire").not().isEmpty(),
    check("auteur", "l'auteur du livre est obligatoire").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const livre = livresData.find((livre) => livre.id === parseFloat(id));

    if (!livre) {
      return res.status(404).json({
        error: true,
        message: "Livre non trouvé",
      });
    } else {
      const { titre, auteur } = req.body;
      livre.titre = titre;
      livre.auteur = auteur;

      const isSaved = save(livresData);
      if (!isSaved) {
        return res.status(500).json({
          error: true,
          message: "impossible d'enregistrer Livres",
        });
      }

      res.status(201).json({
        message: "Succès",
        livre: livre,
      });
    }
  }
);

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const livre = livresData.find((livre) => livre.id === parseFloat(id));
  if (!livre) {
    return res.status(404).json({
      error: true,
      message: "Livre non trouvé",
    });
  }

  const livres = livresData.filter((livre) => livre.id !== parseFloat(id));
  const isSaved = save(livres);
  if (!isSaved) {
    return res.status(500).json({
      error: true,
      message: "impossible d'enregistrer Livres",
    });
  }
  res.status(200).json({
    message: "Succès",
  });
});

module.exports = router;
