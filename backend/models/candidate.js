const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema  = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  country: String,
  city: String,
  recruiterContact: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  grade: String,
  experience: Number,
  lastContactDateMs: Number,
  contacts: [{
    type: {
      type: String,
    },
    value: String,
  }],
});

module.exports = mongoose.model('Candidate', candidateSchema);
