const Condition = require('../models/Condition');
const MedicationRequest = require('../models/MedicationRequest');
const Observation = require('../models/Observation');
const Observation_BMI = require('../models/Observation_BMI');
const Observation_BodyHeight = require('../models/Observation_BodyHeight');
const Observation_BodyWeight = require('../models/Observation_BodyWeight');
const Observation_HBA1C = require('../models/Observation_HBA1C');
const Patient = require('../models/Patient');

const FIND_ALL_LIMIT = 120;
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

  findObservationBMIByID(id) {
    return new Promise((resolve, reject) => {
      Observation_BMI.findById(id)
        .then((observation) => {
          resolve(observation)
        });
    });
  }

  modifyObservation(observationType, id, newValue) {
    switch(observationType) {
      case 'BodyHeight':
        return new Promise((resolve, reject) => {

          Observation_BodyHeight.findById(id, (err, observation) => {
            if (err) return console.error(err);
            let newValues = observation.values;
            if (observation.values.length === 2) newValues.pop();
            newValues.unshift({
              value: newValue,
              issued: observation.values[0].issued
            });
            Observation_BodyHeight.update(
              { _id: id },
              {  $set: { "values": newValues } },
              (err, observation) => {
                if (err) return console.error(err);
                resolve(observation);
              }); 
            }); 
          });
          break;

        case 'BMI':
        return new Promise((resolve, reject) => {
          Observation_BMI.findById(id, (err, observation) => {
            if (err) return console.error(err);
            let newValues = observation.values;
            console.log(observation);
            if (observation.values.length === 2) newValues.pop();
            newValues.unshift({
              value: newValue,
              issued: observation.values[0].issued
            });
            Observation_BMI.update(
              { _id: id },
              {  $set: { "values": newValues } },
              (err) => {
                if (err) return console.error(err);
                Observation_BMI.findById(id, (err, observation) => {
                  if (err) return console.error(err);
                  resolve(observation);
                });
              }); 
            }); 
          });
          break;

          case 'BodyWeight':
          return new Promise((resolve, reject) => {
  
            Observation_BodyWeight.findById(id, (err, observation) => {
              if (err) return console.error(err);
              let newValues = observation.values;
              if (observation.values.length === 2) newValues.pop();
              newValues.unshift({
                value: newValue,
                issued: observation.values[0].issued
              });
              Observation_BodyWeight.update(
                { _id: id },
                {  $set: { "values": newValues } },
                (err, observation) => {
                  if (err) return console.error(err);
                  resolve(observation);
                }); 
              }); 
            });
            break;

            case 'HBA1C':
            return new Promise((resolve, reject) => {
    
              Observation_HBA1C.findById(id, (err, observation) => {
                if (err) return console.error(err);
                let newValues = observation.values;
                if (observation.values.length === 2) newValues.pop();
                newValues.unshift({
                  value: newValue,
                  issued: observation.values[0].issued
                });
                Observation_HBA1C.update(
                  { _id: id },
                  {  $set: { "values": newValues } },
                  (err, observation) => {
                    if (err) return console.error(err);
                    resolve(observation);
                  }); 
                }); 
              });
              break;
        }
    }
  
    findObservationsHBA1CByID(patientID) {
      return new Promise((resolve, reject) => {
        Observation_HBA1C.find({ patientID: patientID })
          .then((observations) => {
            resolve(observations)
          });
      });
    }

  findMedicationRequestByID(patientID) {
    return new Promise((resolve, reject) => {
      MedicationRequest.find({ patientID: patientID })
        .then((medicationRequests) => {
          resolve(medicationRequests)
        });
    });
  }

  findConditionsByID(patientID) {
    return new Promise((resolve, reject) => {
      Condition.find({ patientID: patientID })
        .then((conditions) => {
          resolve(conditions)
        });
    });
  }

  findPatients() {
    return new Promise((resolve, reject) => {
      Patient.find({}, (err, patients) => {
        if (err) return console.error(err);
        resolve(patients);
      }).limit(FIND_ALL_LIMIT);
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
      Patient.find( { lastName: name } )
        .then((patients) => {
          resolve(patients)
        });
    });
  }
}


module.exports = Database;