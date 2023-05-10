const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema  = new Schema({
  name: {
    type: String,
    required: true,
  },
  contacts: {
    linkedin: {
      type: String,
    },
    email: {
      type: String,
    },
    telegram: {
      type: String,
    },
    other: {
      type: String,
    },
  },
  user: {

  }
});

module.exports = mongoose.model('Candidate', candidateSchema);
