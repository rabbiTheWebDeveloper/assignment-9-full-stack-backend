import { NextFunction, Request, Response } from "express";
import { createContractFromDB, getAllProductsFromDB, getProductByIdFromDB } from "./contactus.service";
import { sendApiResponse } from "../../utlis/responseHandler";

export const getAllContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const products = await getAllProductsFromDB();
  sendApiResponse(res, 200, true, products);
};

export const getContactById = async (req: Request,res: Response,next: NextFunction) => {
  const { id } = req.params;
  const product = await getProductByIdFromDB(id);
  sendApiResponse(res, 200, true, product);
};

export const createContract = async (req: Request,res: Response,next: NextFunction) => {
    const data = req.body;
    const product = await createContractFromDB(data);
    sendApiResponse(res, 200, true, product);
  };