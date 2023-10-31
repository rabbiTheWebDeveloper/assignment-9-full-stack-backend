import { NextFunction, Request, Response } from "express";
import { sendApiResponse } from "../../utlis/responseHandler";
import { createOrderFromDB, getAllOrderFromDB, getAllOrderSummarizeFromDB, getOrderByIdFromDB, getOrderBySearch, getOrderByStatus, getOrdersWithCustomerDetails, getRecentOrderFromDB, orderDateFilter, updateOrderStatusFromDB, updateOrderTrackingIDFromDB } from "./order.service";


export const getAllOrder = async (req: Request,res: Response,next: NextFunction
) => {
  const products = await getAllOrderFromDB();
  sendApiResponse(res, 200, true, products);
};

export const getRecentOrder = async (req: Request,res: Response,next: NextFunction
  ) => {
    const products = await getRecentOrderFromDB();
    sendApiResponse(res, 200, true, products);
  };
  
  export const getCustomerList = async (req: Request,res: Response,next: NextFunction
    ) => {
      const products = await getOrdersWithCustomerDetails();
      sendApiResponse(res, 200, true, products);
    };
export const getOrderById = async ( req: Request,res: Response,next: NextFunction) => {
  const { id } = req.params;
  const product = await getOrderByIdFromDB(id);
  sendApiResponse(res, 200, true, product);
};

export const getOrderByOrderStatus = async ( req: Request,res: Response,next: NextFunction) => {
  const { status } = req.params;
  const product = await getOrderByStatus(status);
  sendApiResponse(res, 200, true, product);
};
export const getOrderByOrderSearch = async ( req: Request,res: Response,next: NextFunction) => {
  const { search } = req.params;
  const product = await getOrderBySearch(search);
  sendApiResponse(res, 200, true, product);
};

export const createOrder = async (req: Request,res: Response,next: NextFunction) => {
    const data = req.body;
    const product = await createOrderFromDB(data);
    sendApiResponse(res, 200, true, product);
  };


  export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body;
      const id:any = (req.params.id)
      const product = await updateOrderStatusFromDB(id, status);
      sendApiResponse(res, 200, true, product);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  export const updateOrderTraking = async (req: Request, res: Response) => {
    try {
      const { tracking_ID } = req.body;
      const id:any = (req.params.id)
      const product = await updateOrderTrackingIDFromDB(id, tracking_ID);
      sendApiResponse(res, 200, true, product);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };



  export const getAllOrderSummarize = async (req: Request,res: Response,next: NextFunction
    ) => {
      const products = await getAllOrderSummarizeFromDB();
      sendApiResponse(res, 200, true, products);
    };


    export const getAllOrderFilterDates = async (req: Request,res: Response,next: NextFunction
      ) => {
        const { date } = req.params;
        const product = await orderDateFilter(date);
        sendApiResponse(res, 200, true, product);
      };
  