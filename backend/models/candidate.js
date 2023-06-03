const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema  = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  recruiterContact: { // TODO: think about [String] type
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
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

module.exports = mongoose.model('Candidate', candidateSchema);
