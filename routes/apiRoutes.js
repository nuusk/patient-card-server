const mongoose = require('mongoose');
const Database = require('../services/Database');
const db = new Database();

const FANCY_TIMER = 1000;

module.exports = (app) => {
  app.get('/observations/height/:id', (req, res) => {
    db.findObservationsBodyHeightByID(req.params.id)
    .then(observations => {
      res.send(observations);
    });
  });

  app.get('/observations/weight/:id', (req, res) => {
    db.findObservationsBodyWeightByID(req.params.id)
    .then(observations => {
      res.send(observations);
    });
  });

  app.get('/observations/bmi/:id', (req, res) => {
    db.findObservationsBMIByID(req.params.id)
    .then(observations => {
      res.send(observations);
    });
  });

  app.get('/observation/:id', (req, res) => {
    db.findObservationBMIByID(req.params.id)
    .then(observation => {
      res.send(observation);
    });
  });

  app.post('/observation/bodyheight', (req, res) => {
    db.modifyObservation('BodyHeight', req.body.id, req.body.newValue)
    .then(observation => {
      res.send(observation);
    });
  });

  app.post('/observation/bmi', (req, res) => {
    db.modifyObservation('BMI', req.body.id, req.body.newValue)
    .then(observation => {
      res.send(observation);
    });
  });

  app.get('/observations/hba1c/:id', (req, res) => {
    db.findObservationsHBA1CByID(req.params.id)
    .then(observations => {
      res.send(observations);
    });
  });

  app.get('/medications/:id', (req, res) => {
    db.findMedicationRequestByID(req.params.id)
    .then(medications => {
      res.send(medications);
    });
  });

  app.get('/conditions/:id', (req, res) => {
    db.findConditionsByID(req.params.id)
    .then(conditions => {
      res.send(conditions);
    });
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

  app.get('/patients/name/:lastName', (req, res) => {
    let lastName = req.params.lastName.charAt(0).toUpperCase() + req.params.lastName.slice(1);
    db.findPatientsByName(lastName)
    .then(patients => {
      res.send(patients);
    })
  });

  app.get('/info', (req, res) => {
    res.send("<h2>Patient Card</h2>");
  })
};