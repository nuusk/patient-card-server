const mongoose = require('mongoose');
const { Schema } = mongoose;

const PatientSchema = Schema({
  patientID: Number,        // 44001
  firstName: String,        // Edgar
  lastName: String,         // Poe
  prefix: String,           // Mr.            (name[0].prefix)
  gender: String,           // male
  birthDate: Date,
  city: String,             // Beverly
  state: String,            // MA
  country: String,          // US
  deceasedDateTime: Date,   // null
  maritalStatus: String     // 'M', 'S', ...  (maritalStatus.text)
});

const Patient = mongoose.model('patients', PatientSchema);

module.exports = Patient;
