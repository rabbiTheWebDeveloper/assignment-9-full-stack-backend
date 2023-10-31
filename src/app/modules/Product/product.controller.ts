import { NextFunction, Request, Response } from "express";
import { createProductFromDB, getAllProductsFromDB, getFilterProduct, getProductByIdFromDB, productdelete, updateProductFromDB } from "./product.service";
import { sendApiResponse } from "../../utlis/responseHandler";
import cloudinary from "../../utlis/cloudinary";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";
import { Types } from 'mongoose';
import { validationResult } from "express-validator";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const products = await getAllProductsFromDB();
  sendApiResponse(res, 200, true, products);
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const product = await getProductByIdFromDB(id);
  sendApiResponse(res, 200, true, product);
};
export const getProductByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { sortBy  } = req.params as { sortBy: string };
  const product = await getFilterProduct(sortBy);
  sendApiResponse(res, 200, true, product);
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { name,category_id, brand, rating, sku, price, discount, color, size, qtn, description } = req.body;
  try {
    const result = await cloudinary.uploader.upload((req.file as Express.Multer.File).path);
    const imageUrl = result.secure_url;
    const newProduct: IProduct = new Product({
      name,
      category_id,
      sku,
      brand,
      rating,
      price,
      discount,
      color,
      qtn,
      size,
      description,
      product_image: imageUrl
    });
    const product = await createProductFromDB(newProduct);
    sendApiResponse(res, 200, true, product);
  } catch (error) {
    console.error("An error occurred:", error);
    sendApiResponse(res, 500, false, "Internal Server Error");
  }
};

export const productDelete = async (req: Request,res: Response,next: NextFunction
  ) => {
    const { id } = req.params;
    const result = await productdelete(id);
    sendApiResponse(res, 200, true, result);
  };


  export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { name,category_id, brand, rating, sku, price, discount, color, size, qtn, description } = req.body;
    try {

      const productId = req.params.id;
      const existingProduct: any = await Product.findById(productId);
      let imageUrl: any = existingProduct.image;
      if (req.file) {
        const result = await cloudinary.uploader.upload(
          (req.file as Express.Multer.File).path
        );
        imageUrl = result.secure_url;
      }
      const newProduct: any = new Product({
        name,
        category_id,
        sku,
        brand,
        rating,
        price,
        discount,
        color,
        qtn,
        size,
        description,
        product_image: imageUrl
      });
      const updateProduct :any ={
        name: newProduct.name,
        category_id: newProduct.category_id,
        sku: newProduct.sku,
        brand: newProduct.brand,
        rating: newProduct.rating,
        price: newProduct.price,
        discount: newProduct.discount,
        color: newProduct.color,
        qtn: newProduct.qtn,
        size: newProduct.size,
        description: newProduct.description,
        product_image: newProduct.product_image
      }
      const product = await updateProductFromDB(productId ,updateProduct);
      sendApiResponse(res, 200, true, product);
    } catch (error) {
      console.error("An error occurred:", error);
      sendApiResponse(res, 500, false, "Internal Server Error");
    }
  };


