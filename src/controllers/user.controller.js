import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Farmer, Buyer } from '../models/user.model';

export const Signup = (req, res, next) => {
  try {
    res.status(200).send({
      status: "success",
      message: "User signup functionality is working",
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      message: "An error occured in the signup route",
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
      { id: user._id, email: user.email }, // include more details in the payload if necessary
      process.env.JWT_SECRET, // Define JWT secret in .env
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Send response with token
    res.status(200).send({
      status: 'success',
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 'fail',
      message: 'An error occurred during login',
    });
  }
};

// export const Login = (req, res, next) => {
//   //login functionalities 
//   try {
//     res.status(200).send({
//       status: "success",
//       message: "User Login functionality is working",
//     });
//   } catch (error) {
//     res.status(500).send({
//       status: "fail",
//       message: "An error occured in the signup route",
//     });
//   }
// };
