const Condition = require('../models/Condition');
const MedicationRequest = require('../models/MedicationRequest');
const Observation = require('../models/Observation');
const Observation_BMI = require('../models/Observation_BMI');
const Observation_BodyHeight = require('../models/Observation_BodyHeight');
const Observation_BodyWeight = require('../models/Observation_BodyWeight');
const Observation_HBA1C = require('../models/Observation_HBA1C');
const Patient = require('../models/Patient');

const FIND_ALL_LIMIT = 20;
const FIND_QUERY_LIMIT = 20;

class Database {

  addCondition(condition) {
    Condition.create(condition);
  }

  addMedicationRequest(medicationRequest) {
    MedicationRequest.create(medicationRequest);
  }

  addObservation(observation) {
    switch(observation.observation) {
      case 'Body Height':
        Observation_BodyHeight.create(observation);
        break;
      case 'Body Weight':
        Observation_BodyWeight.create(observation);
        break;
      case 'Body Mass Index':
        Observation_BMI.create(observation);
        break;
      case 'hba1c':
        Observation_HBA1C.create(observation);
        break;
    }
  }

  addPatient(patient) {
    Patient.create(patient);
  }

  findObservationsBodyHeight() {
    return new Promise((resolve, reject) => {
      Observation_BodyHeight.find({})
        .then((observations) => {
          resolve(observations)
        });
    });
  }

  findObservationsBodyHeightByID(patientID) {
    return new Promise((resolve, reject) => {
      Observation_BodyHeight.find({ patientID: patientID })
        .then((observations) => {
          resolve(observations)
        });
    });
  }

  findObservationsBodyWeight() {
    return new Promise((resolve, reject) => {
      Observation_BodyWeight.find({})
        .then((observations) => {
          resolve(observations)
        });
    });
  }

  findObservationsBodyWeightByID(patientID) {
    return new Promise((resolve, reject) => {
      Observation_BodyWeight.find({ patientID: patientID })
        .then((observations) => {
          resolve(observations)
        });
    });
  }

  findObservationsBMI() {
    return new Promise((resolve, reject) => {
      Observation_BMI.find({})
        .then((observations) => {
          resolve(observations)
        });
    });
  }

  findObservationsBMIByID(patientID) {
    return new Promise((resolve, reject) => {
      Observation_BMI.find({ patientID: patientID })
        .then((observations) => {
          resolve(observations)
        });
    });
  }

  findObservationsHBA1C() {
    return new Promise((resolve, reject) => {
      Observation_HBA1C.find({})
        .then((observations) => {
          resolve(observations)
        });
    });
  }

  findObservationsHBA1CByID(patientID) {
    return new Promise((resolve, reject) => {
      Observation_HBA1C.find({ patientID: patientID })
        .then((observations) => {
          resolve(observations)
        });
    });
  }

  findPatients() {
    return new Promise((resolve, reject) => {
      Patient.find({}, (err, patients) => {
        if (err) return console.error(err);
        resolve(patients);
      });
    });
  }

  findPatientByID(patientID) {
    return new Promise((resolve, reject) => {
      Patient.find({ patientID: patientID })
        .then((patient) => {
          resolve(patient)
        });
    });
  }

  findPatientsByName(name) {
    return new Promise((resolve, reject) => {
      Patient.find( { firstName: name } )
        .then((patients) => {
          resolve(patients)
        });
    });
  }
}


module.exports = Database;