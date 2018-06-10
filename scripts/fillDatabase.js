const fs = require('fs');
const Database = require('../services/Database');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const db = new Database();

const counter = { };
let patientID = 44000;

mongoose.connect(keys.mongoURI, () => {
  console.log('Successfully connected to DB!');
      
  const patientFileNames = fs.readdirSync(`${__dirname}/../data/fhir`);
  patientFileNames.forEach(patientFileName => {
    const patient = require(`../data/fhir/${patientFileName}`);
    patient.entry.forEach(resourceEntry => {

      if (resourceEntry.resource.resourceType === 'Condition') {
        const currentCondition = {
          patientID: patientID,
          clinicalStatus: resourceEntry.resource["clinicalStatus"],
          verificationStatus: resourceEntry.resource["verificationStatus"],
          condition: resourceEntry.resource.code.text,
          onsetDateTime: resourceEntry.resource["onsetDateTime"],
          assertedDate: resourceEntry.resource["assertedDate"]
        }
        db.addCondition(currentCondition);
      }

      if (resourceEntry.resource.resourceType === 'MedicationRequest') {
        const currentMedication = {
          patientID: patientID,
          values: [{
            description: resourceEntry.resource.extension[0].valueCodeableConcept.text,
            request: resourceEntry.resource.medicationCodeableConcept.text
          }],
          authoredOn: resourceEntry.resource["authoredOn"]
        }
        db.addMedicationRequest(currentMedication);
      }

      if (resourceEntry.resource.resourceType === 'Observation' &&
            resourceEntry.resource.valueQuantity && (
              resourceEntry.resource.code.coding[0].display === 'Body Height' ||
              resourceEntry.resource.code.coding[0].display === 'Hemoglobin A1c/Hemoglobin.total in Blood' ||
              resourceEntry.resource.code.coding[0].display === 'Body Weight' ||
              resourceEntry.resource.code.coding[0].display === 'Body Mass Index' )) {
          const currentObservation = {
            patientID: patientID,
            status: resourceEntry.resource["status"],
            observation: resourceEntry.resource.code.coding[0].display === 'Hemoglobin A1c/Hemoglobin.total in Blood' ? 'hba1c' : resourceEntry.resource.code.coding[0].display,
            effectiveDateTime: resourceEntry.resource["effectiveDateTime"],
            values: [{
              issued: resourceEntry.resource["issued"],
              value: resourceEntry.resource.valueQuantity.value
            }],
            unit: resourceEntry.resource.valueQuantity.unit
          }
          db.addObservation(currentObservation);
        }

        if (resourceEntry.resource.resourceType === 'Patient') {
          const currentPatient = {
            patientID: patientID,
            firstName: patientFileName.split('.')[0].replace(/[0-9]/g, '').split('_').join(' ').split(' ')[1],
            lastName: patientFileName.split('.')[0].replace(/[0-9]/g, '').split('_').join(' ').split(' ')[0],
            prefix: resourceEntry.resource["name"][0].prefix ? resourceEntry.resource["name"][0].prefix[0] : resourceEntry.resource["gender"]==='male' ? 'Mr.' : 'Mrs.',
            gender: resourceEntry.resource["gender"],
            birthDate: resourceEntry.resource["birthDate"],
            city: resourceEntry.resource["address"][0].city,
            state: resourceEntry.resource["address"][0].state,
            country: resourceEntry.resource["address"][0].country,
            deceasedDateTime: resourceEntry.resource["deceasedDateTime"],
            maritalStatus: resourceEntry.resource["maritalStatus"].coding[0].code
          }
          db.addPatient(currentPatient);
        }
    });
    patientID++;
  });
});