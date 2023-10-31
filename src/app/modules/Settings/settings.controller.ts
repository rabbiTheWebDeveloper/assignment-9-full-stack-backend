import { NextFunction, Request, Response } from "express";
import { sendApiResponse } from "../../utlis/responseHandler";
import cloudinary from "../../utlis/cloudinary";
import { ISettings } from "./settings.interface";
import { Setting } from "./settings.model";
import {createSettingFromDB, getSettingDB } from "./settings.service";


export const getSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const products = await getSettingDB();
  sendApiResponse(res, 200, true, products);
};

export const addSettings = async (req: Request,res: Response,next: NextFunction
  ) => {
    const { social_media,address,mobile ,footer_about } = req.body;
    
      const result = await cloudinary.uploader.upload((req.file as Express.Multer.File).path);

      const imageUrl = result.secure_url;
  
    const newProduct: ISettings = new Setting({
      social_media,
      address,
      mobile,
      footer_about,
      logo:imageUrl,
     
    });

    const product = await createSettingFromDB( newProduct);
    sendApiResponse(res, 200, true, product);
  };