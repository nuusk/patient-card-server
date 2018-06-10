const mongoose = require('mongoose');
const Database = require('../services/Database');
const db = new Database();

const FANCY_TIMER = 1000;

module.exports = (app) => {
  app.get('/observations/height/:id', (req, res) => {
    db.findObservationsBodyHeightByID(req.params.id)
    .then(observations => {
      res.send(observations);
    })
  });

  app.get('/patients', (req, res) => {
    db.findPatients()
    .then(patients => {
      res.send(patients);
    })
  });

  app.get('/patient/:id', (req, res) => {
    db.findPatientByID(req.params.id)
    .then(patient => {
      res.send(...patient);
    })
  });

  app.get('/info', (req, res) => {
    res.send("<h2>Patient Card</h2>");
  })
};