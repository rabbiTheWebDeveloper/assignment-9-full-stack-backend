import mongoose, { Schema } from "mongoose";
import { IContact } from "./contactus.interface";

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey:false
  } 
  
);

export const Contact= mongoose.model<IContact>("contact-us", contactSchema);