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
  contacts: {
    type: [
      {
        type: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        }
      }
    ],
    validate: {
      validator: (contacts) => (contacts && contacts.length >= 1),
      message: 'At least one contact is required',
    },
  }
});

module.exports = mongoose.model('Candidate', candidateSchema);
