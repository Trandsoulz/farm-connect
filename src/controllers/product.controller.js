import { uploadImagesFunctionSingle } from "../helpers/img";
import Product from "../models/product.model.js";

export const AddProduct = async (req, res, next) => {
  const imgResult = await uploadImagesFunctionSingle(req.file);
  const productDetails = req.body;

  try {
    const addedProduct = await Product.create({
      productDetails,
      images: imgResult,
      _farmer: req.id,
    });

    res.status(201).send({
      status: "Success",
      message: "Products added successfully",
      addedProduct,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "An error occured on the server",
    });
  }
};

export const GetProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    if (!products) {
      return res.status(404).send({
        status: "fail",
        message: "No products in the DB",
      });
    }

    res.status(201).send({
      status: "Success",
      products,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "AN error occured on the server",
    });
  }
};

export const GetProductById = async (req, res, next) => {
  try {
    const products = await Product.find({ _farmer: req.id });

    if (!products) {
      return res.status(404).send({
        status: "fail",
        message: "No products in the DB",
      });
    }

    res.status(201).send({
      status: "Success",
      products,
    });
  } catch (error) {
    res.status(400).send({
      status: "fail",
      message: "AN error occured on the server",
    });
  }
};
