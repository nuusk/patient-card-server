const Condition = require('../models/Condition');
const MedicationRequest = require('../models/MedicationRequest');
const Observation = require('../models/Observation');
const Patient = require('../models/Patient');

const FIND_ALL_LIMIT = 20;
const FIND_QUERY_LIMIT = 20;

class Database {

  addCondition(condition) {
    Condition.create({
      patientID: condition.patientID,
      clinicalStatus: condition.clinicalStatus,
      vericationStatus: condition.vericationStatus,
      condition: condition.condition,
      onsetDateTime: condition.onsetDateTime,
      assertedDate : condition.assertedDate
    });
  }

  addMedicationRequest(medicationRequest) {
    MedicationRequest.create({
      patientID: medicationRequest.patientID,
      type: medicationRequest.type,
      request: medicationRequest.request,
      authoredOn: medicationRequest.authoredOn 
    })
  }

  addObservation(observation) {
    Observation.create({
      patientID: observation.patientID,
      status: observation.status,
      observation: observation.observation,
      effectiveDateTime: observation.effectiveDateTime,
      issued: observation.issued,
      value: observation.value,
      unit: observation.unit
    })
  }

  addPatient(patient) {
    Patient.create({
      patientID: patient.patientID,
      firstName: patient.firstName,
      lastName: patient.lastName,
      prefix: patient.prefix,
      gender: patient.gender,
      birthDate: patient.birthDate,
      city: patient.city,
      state: patient.state,
      country: patient.country,
      deceasedDateTime: patient.deceasedDateTime,
      maritalStatus: patient.maritalStatus
    })
  }

  findPatientByID(patientID) {
    return new Promise((resolve, reject) => {
      Patient.find({ patientID: patientID })
        .limit(1)
        .then((patient) => {
          resolve(patient)
        });
    });
  }

  findPatientsByName(name) {
    return new Promise((resolve, reject) => {
      Patient.find( { firstName: name } )
        .limit(FIND_QUERY_LIMIT)
        .then((patients) => {
          resolve(patients)
        });
    });
  }

  findpatients() {
    return new Promise((resolve, reject) => {
      Patient.find({}, (err, patients) => {
        if (err) return console.error(err);
        resolve(patients);
      }).limit(FIND_ALL_LIMIT);
    });
  }
}


module.exports = Database;