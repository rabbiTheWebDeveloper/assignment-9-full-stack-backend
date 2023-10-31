import { NextFunction, Request, Response } from "express";
import {
  bannerdelete,
  createBannerFromDB,
  getAllBannerFromDB,
  getBannerByIdFromDB,
  updateBannerFromDB,
} from "./banner.service";
import { sendApiResponse } from "../../utlis/responseHandler";
import { IBanner } from "./banner.interface";
import { Banner } from "./banner.model";
import cloudinary from "../../utlis/cloudinary";

export const getAllBanner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const products = await getAllBannerFromDB();
  sendApiResponse(res, 200, true, products);
};

export const getBannerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const product = await getBannerByIdFromDB(id);
  sendApiResponse(res, 200, true, product);
};

export const createBanner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { header, subheader } = req.body;
  const result = await cloudinary.uploader.upload(
    (req.file as Express.Multer.File).path
  );
  const imageUrl = result.secure_url;
  const newProduct: IBanner = new Banner({
    header,
    subheader,
    image: imageUrl,
  });
  const product = await createBannerFromDB(newProduct);
  sendApiResponse(res, 200, true, product);
};

export const bannerDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const result = await bannerdelete(id);
  sendApiResponse(res, 200, true, result);
};

export const updateBanner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { header, subheader } = req.body;
  const bannerId = req.params.id;
  const existingProduct: any = await Banner.findById(bannerId);

  let imageUrl: any = existingProduct.image;
  if (req.file) {
    const result = await cloudinary.uploader.upload(
      (req.file as Express.Multer.File).path
    );
    imageUrl = result.secure_url;
  }
  const newBanner: any = new Banner({
    header,
    subheader,
    image: imageUrl,
  });
  const updatePayload : any = {
    header: newBanner.header,
    subheader: newBanner.subheader,
    image: newBanner.image,
  };
  const product = await updateBannerFromDB(bannerId ,updatePayload);
  sendApiResponse(res, 200, true, product);
};
