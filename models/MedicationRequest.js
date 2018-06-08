const mongoose = require('mongoose');
const { Schema } = mongoose;

const MedicationRequestSchema = Schema({
  patientID: Number,        // 44001
  type: String,             // Prescription of drug (procedure) (extension[0].valueCodeableConcept.text)
  request: String,          // 'Clopidogrel 75 MG Oral Tablet (medicationCodeableConcept.text)
  authoredOn: Date
});

const MedicationRequest = mongoose.model('medicationRequests', MedicationRequestSchema);

module.exports = MedicationRequest;
