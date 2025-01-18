import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    typeOfProduct: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    _farmer : {
        type : Schema.Types.ObjectId,
        ref : 'Farmer'
    }
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

export default Product;
