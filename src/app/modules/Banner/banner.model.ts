import mongoose, { Schema } from "mongoose";
import { IBanner} from "./banner.interface";

const bannerSchema = new Schema<IBanner>(
  {
    header: {
      type: String,
      required: true,
    },
    subheader: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
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

export const Banner = mongoose.model<IBanner>("banner", bannerSchema);