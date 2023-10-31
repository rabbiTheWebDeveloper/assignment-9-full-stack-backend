import { NextFunction, Request, Response } from "express";
import { sendApiResponse } from "../../utlis/responseHandler";
import cloudinary from "../../utlis/cloudinary";
import { IReview } from "./review.interface";
import { Review } from "./review.model";
import {
  getAllReviewFromDB,
  getReviewByIdFromDB,
  createReviewFromDB,
  updateReviewFromDB,
} from "./review.service";

export const getAllReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const products = await getAllReviewFromDB();
  sendApiResponse(res, 200, true, products);
};

export const getReviewById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const product = await getReviewByIdFromDB(id);
  sendApiResponse(res, 200, true, product);
};

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { review_name, review, description } = req.body;

  // Upload image to Cloudinary
  const result = await cloudinary.uploader.upload(
    (req.file as Express.Multer.File).path
  );

  // Get the image URL from the Cloudinary response
  const imageUrl = result.secure_url;
  const newBlog: IReview = new Review({
    review_name,
    description,
    review,
    image: imageUrl,
  });
  const product = await createReviewFromDB(newBlog);
  sendApiResponse(res, 200, true, product);
};

export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { review_name, review, description } = req.body;
  const productId = req.params.id;
  const existingProduct: any = await Review.findById(productId);

  let imageUrl: any = existingProduct.image;
  if (req.file) {
    const result = await cloudinary.uploader.upload(
      (req.file as Express.Multer.File).path
    );
    imageUrl = result.secure_url;
  }
  const newBlog: any = new Review({
    review_name,
    description,
    review,
    image: imageUrl,
  });
  const newPlauload = {
    review_name: newBlog.review_name,
    description: newBlog.description,
    review: newBlog.review,
    image: newBlog.image
  }

  const result = await updateReviewFromDB(productId, newPlauload);
  sendApiResponse(res, 200, true, result);
};
