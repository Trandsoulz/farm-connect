// Create the user-model
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'User name is required'],
        },

        email: {
            type: String,
            required: [true, "User email is required"],
            unique: true,
            validate: [validator.isEmail, "Please enter a valid email"]
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minLength: 8
         },
         passwordConfirm: {
            type: String,
            required: [true, 'User password confirmation is required'],
            minLength: 8
         }
    },

    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User;

// Both farmer and customer