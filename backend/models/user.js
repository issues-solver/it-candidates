const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // TODO: Do I need to add id property???
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
                contact: {
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

// const signInSchema = new Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
// });

const User = mongoose.model('User', userSchema);
// const SignInUser = mongoose.model('SignInUser', signInSchema);

module.exports = User;

