// Creating the Farmer and Buyer signup schema
import mongoose from "mongoose";
import validator from "validator";


// Schema for Farmer Signup page

const farmerSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Full name is required'],
        },

        farmName: {
            type: String,
            required: [true, 'Farm name is required'],
        },

        farmLocation: {
            type: String,
            required: [true, 'Please enter your farm Location'],
        },

        phoneNumber: {
            type: Number,
            require: [validator.isNumeric, "Please enter a valid number"]
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
    },

    {
        timestamps: true,
    }
)

// Schema for Buyer Signup page

const buyerSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Full name is required'],
        },

        delieveryAddress: {
            type: String,
            required: [true, 'Please enter address for delievery'],
        },

        phoneNumber: {
            type: Number,
            require: [validator.isNumeric, "Please enter a valid number"]
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
  },

  {
    timestamps: true,
  }
);

// Models
const Farmer = mongoose.model('Farmer', farmerSchema);
const Buyer = mongoose.model('Buyer', buyerSchema);

// Export Both Models
export {Farmer, Buyer};
