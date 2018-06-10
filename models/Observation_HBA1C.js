const mongoose = require('mongoose');
const { Schema } = mongoose;

// Model for specific observation. in this case: Hemoglobin A1c/Hemoglobin.total in Blood
const Observation_HBA1CSchema = Schema({
  patientID: Number,        // 44001
  status: String,           // final
  observation: String,      // always 'hba1c'
  effectiveDateTime: Date,
  values: [{
    issued: Date,          // last modification date
    value: Number            // 87.25
  }],
  unit: String              // kg
});

const Observation_HBA1C = mongoose.model('observations_HBA1C', Observation_HBA1CSchema);

module.exports = Observation_HBA1C;
