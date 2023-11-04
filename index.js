"use strict";

const models = require("../models/model");
const express = require("express");
const model = require("../models/model");
const { response } = require("../app");

const router = express.Router();
module.exports = router;

// Escriban sus rutas acá
// Siéntanse libres de dividir entre archivos si lo necesitan

router.get("/users", (req, res) => {
  res.status(200).json(models.listUsers());
});

router.post("/users", (req, res) => {
  const { email, name } = req.body;
  try {
    res.status(201).json({ msg: models.addUser(email, name) });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

router.patch("/users/plan", (req, res) => {
  const { user } = req.query;
  try {
    res.status(200).json({ msg: models.switchPlan(user) });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

router.get("/series", (req, res) => {
  res.status(200).json(models.listSeries());
});

router.post("/series", (req, res) => {
  const { name, seasons, category, year } = req.body;
  try {
    res
      .status(201)
      .json({ msg: models.addSerie(name, seasons, category, year) });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});





router.get("/series/:category", (req, res) => {
  const { category } = req.params;
  try {
    res.status(200).json(models.listSeries(category));
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

router.get("/play/:serie", (req, res) => {
  const { serie } = req.params;
  const { user } = req.query;
  try {
    res.status(200).json({ msg: models.play(serie, user) });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

router.get("/watchAgain", (req, res) => {
  const { user } = req.query;
  try {
    res.status(200).json(model.watchAgain(user));
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

router.post("/rating/:serie", (req, res) => {
  const { serie } = req.params;
  const { email, score } = req.body;
  try {
    res.status(200).json({ msg: models.rateSerie(serie, email, score) });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

// Hint:  investigá las propiedades del objeto Error en JS para acceder al mensaje en el mismo.
