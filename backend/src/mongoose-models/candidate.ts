import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const candidateSchema  = new Schema({
  fullName: {
    type: String,
    required: true,
  },
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
      validator: (contacts: any[]) => (contacts && contacts.length >= 1),
      message: 'At least one contact is required',
    },
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

export default mongoose.model('Candidate', candidateSchema);
