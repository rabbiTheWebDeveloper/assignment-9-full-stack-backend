import mongoose, { Schema } from "mongoose";
import {  IReview } from "./review.interface";

const reviewSchema = new Schema<IReview>(
  {
    review_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    review: {
      type: String,
      required: true,
    },
    image: String,
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

export const Review = mongoose.model<IReview>("reviews", reviewSchema);