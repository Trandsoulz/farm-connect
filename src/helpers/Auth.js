import { promisify } from "util";
import jwt from "jsonwebtoken";
import { Farmer } from "../models/user.model.js";
import { JWT_SECRET } from "../config/envConfig";

const protectRoute = async (req, res, next) => {
  let token;

  // ! First, get the token
  if (
    req.headers["authorization"] &&
    req.headers["authorization"].startsWith("Bearer")
  ) {
    token = req.headers["authorization"].split(" ")[1];
    // console.log(token);
  } else {
    res.status(401).send({
      status: "fail",
      message: "You are unauthorised to access this endpoint",
    });
  }

  // ! Verify token

  const { id, iat, exp } = await promisify(jwt.verify)(token, JWT_SECRET);
  // console.log(decoded);

  // ! Check if user exists

  const currentUser = await Farmer.findById(id);

  if (!currentUser) {
    res.status(404).send({
      status: "fail",
      message: "User with this id does not exist",
    });
  }

  //   console.log("Protected route in the house");
  req.user = currentUser;
  req.id = id;
  next();
};

export { protectRoute };
