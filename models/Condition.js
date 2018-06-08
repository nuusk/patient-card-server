const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConditionSchema = Schema({
  patientID: Number,        // 44001
  clinicalStatus: String,   // active
  vericationStatus: String, // confirmed
  condition: String,        // Overlapping malignant neoplasm of colon
  onsetDateTime: Date,      // 1998-07-02T06:59:43-04:00
  assertedDate: Date        // 1998-07-02
});

const Condition = mongoose.model('conditions', ConditionSchema);

module.exports = Condition;
