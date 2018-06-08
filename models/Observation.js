const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObservationSchema = Schema({
  patientID: Number,        // 44001
  status: String,           // final
  observation: String,      // Disability rating scale (code.coding.text)
  effectiveDateTime: Date,
  issued: Date,
  value: Number,            // 87.25
  unit: String              // kg
});

const Observation = mongoose.model('observations', ObservationSchema);

module.exports = Observation;
