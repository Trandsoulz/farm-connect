import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Farmer, Buyer } from '../models/user.model.js';
import { JWT_SECRET } from '../config/envConfig.js';

export const SignupAsFarmer = async (req, res, next) => {

  const user = req.body;

  try {
    // Check if all fields were inputted
    if(!user.fullName || !user.email || !user.phoneNumber || !user.farmName || !user.farmLocation || !user.password || !user.typeOfProduce) {
      return res.status(400).send({
        status : "fail",
        message : "Input all fields"
      })
    }

    // Create farmer in the DB
    await Farmer.create(user);

    // Sign token that'll be sent to the user 
    const token = jwt.sign(
      { id: user._id }, // include more details in the payload if necessary
      JWT_SECRET, // Define JWT secret in .env
      { expiresIn: '90d' } // Token expires in 1 hour
    );

    res.set('x-auth-token', token).status(201).send({
      status: "success",
      message: "Farmer successfully signed up",
    });


  } catch (error) {
    console.error(error)
    res.status(500).send({
      status: "error",
      message: "An error occured in the server",
    });
  }
};

export const SignupAsBuyer = async (req, res, next) => {

  const user = req.body;

  try {
    // Check if all fields were inputted
    if(!user.fullName || !user.email || !user.phoneNumber || !user.deliveryAddress || !user.password) {
      return res.status(400).send({
        status : "fail",
        message : "Input all fields"
      })
    }

    // Create farmer in the DB
    await Buyer.create(user);

    // Sign token that'll be sent to the user 
    const token = jwt.sign(
      { id: user._id }, // include more details in the payload if necessary
      JWT_SECRET, // Define JWT secret in .env
      { expiresIn: '90d' } // Token expires in 1 hour
    );

    res.set('x-auth-token', token).status(201).send({
      status: "success",
      message: "Buyer successfully signed up",
    });


  } catch (error) {
    console.error(error)
    res.status(500).send({
      status: "error",
      message: "An error occured in the server",
    });
  }
};

export const Login = async (req, res, next) => {
  const { email, phoneNumber, password } = req.body;

  try {
    let user;

    // Check if email or phone number is provided and find the user
    if (email) {
      user = await Farmer.findOne({ email }) || await Buyer.findOne({ email });
    } else if (phoneNumber) {
      user = await Farmer.findOne({ phoneNumber }) || await Buyer.findOne({ phoneNumber });
    }

    // If no user found
    if (!user) {
      return res.status(404).send({
        status: 'fail',
        message: 'User not found',
      });
    }

    // Compare the provided password with the stored password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({
        status: 'fail',
        message: 'Invalid credentials',
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id }, // include more details in the payload if necessary
      JWT_SECRET, // Define JWT secret in .env
      { expiresIn: '90d' } // Token expires in 1 hour
    );

    // Send response with token
    res.set('x-auth-token', token).status(200).send({
      status: 'success',
      message: 'Login successful',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 'error',
      message: 'An error occurred on the server',
    });
  }
};
