import express from "express";
import { AddProduct, GetProducts, GetProductById } from "../controllers/product.controller.js";
import { protectRoute } from "../helpers/Auth.js";
import upload from "../helpers/upload.js";

const router = express.Router();

router.post("/", protectRoute, upload.single("image"), AddProduct);
router.get("/", GetProducts);
router.get('/farmer', protectRoute, GetProductById )

export default router;
