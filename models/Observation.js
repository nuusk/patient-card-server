const mongoose = require('mongoose');
const { Schema } = mongoose;

// for now only for if(resourceEntry.resource.valueQuantity) 
// this means that we only store informations about such things as body weight, bmi, etc...
const ObservationSchema = Schema({
  patientID: Number,        // 44001
  status: String,           // final
  observation: String,      // Disability rating scale (code.coding.text)
  effectiveDateTime: Date,
  values: [{
    issued: Date,          // last modification date
    value: Number            // 87.25
  }],
  unit: String              // kg
});

const Observation = mongoose.model('observations', ObservationSchema);

module.exports = Observation;
