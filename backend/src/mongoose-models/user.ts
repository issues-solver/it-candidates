import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
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
    }
});

export default mongoose.model('User', userSchema);
