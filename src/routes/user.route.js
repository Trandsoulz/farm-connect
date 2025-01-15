import express from "express";
import { Login, SignupAsBuyer, SignupAsFarmer } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup/farmer", SignupAsFarmer);
router.post("/signup/buyer", SignupAsBuyer);
router.post("/login", Login);

export default router;
