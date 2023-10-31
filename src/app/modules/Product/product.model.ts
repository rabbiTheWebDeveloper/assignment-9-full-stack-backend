import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    category_id: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      // required: true,
    },

    sku: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    qtn: {
      type: String,
      required: true,
    },
    product_image: String,
    // sku: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
  },
  {
    timestamps: true,
    versionKey:false
  } 
  
);

export const Product = mongoose.model<IProduct>("products", productSchema);