import mongoose, { Schema } from "mongoose";
import { ISettings } from "./settings.interface";


const settingsSchema = new Schema<ISettings>(
  {
    logo:String,
    // fav_icon :String,
    social_media: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    footer_about : {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey:false
  } 
  
);

export const Setting = mongoose.model<ISettings>("settings", settingsSchema);