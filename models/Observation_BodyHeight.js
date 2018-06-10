const mongoose = require('mongoose');
const { Schema } = mongoose;

// Model for specific observation. in this case: Body Height
const Observation_BodyHeightSchema = Schema({
  patientID: Number,        // 44001
  status: String,           // final
  observation: String,      // always 'Body Height'
  effectiveDateTime: Date,  // date of entering the resource (inital date, DO NOT EDIT)
  values: [{
    issued: Date,          // last modification date
    value: Number            // 87.25
  }],
  unit: String              // kg
});

const Observation_BodyHeight = mongoose.model('observations_bodyheight', Observation_BodyHeightSchema);

module.exports = Observation_BodyHeight;
