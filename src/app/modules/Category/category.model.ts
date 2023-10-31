import mongoose, { Schema } from "mongoose";
import { ICategory } from "./category.interface";


const categorysSchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    }
  },
  {
    timestamps: true,
    versionKey:false
  } 
  
);

export const Categorys = mongoose.model<ICategory>("categorys", categorysSchema);