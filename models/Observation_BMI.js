const mongoose = require('mongoose');
const { Schema } = mongoose;

// Model for specific observation. in this case: Body Mass Index
const Observation_BMISchema = Schema({
  patientID: Number,        // 44001
  status: String,           // final
  observation: String,      // always 'Body Mass Index'
  effectiveDateTime: Date,
  values: [{
    issued: Date,            // last modification date
    value: Number            // 87.25
  }],
  unit: String              // kg
});

const Observation_BMI = mongoose.model('observations_BMI', Observation_BMISchema);

module.exports = Observation_BMI;
