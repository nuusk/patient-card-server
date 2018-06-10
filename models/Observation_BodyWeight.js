const mongoose = require('mongoose');
const { Schema } = mongoose;

// Model for specific observation. in this case: Body Weight
const Observation_BodyWeightSchema = Schema({
  patientID: Number,        // 44001
  status: String,           // final
  observation: String,      // always 'Body Weight'
  effectiveDateTime: Date,
  values: [{
    issued: Date,          // last modification date
    value: Number            // 87.25
  }],
  unit: String              // kg
});

const Observation_BodyWeight = mongoose.model('observations_bodyweight', Observation_BodyWeightSchema);

module.exports = Observation_BodyWeight;
