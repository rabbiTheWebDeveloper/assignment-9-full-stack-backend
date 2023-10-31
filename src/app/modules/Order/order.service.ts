import { ObjectId } from "mongoose";
import { IOrder } from "./order.interface";
import { OrderModel } from "./order.model";
import { Document } from "mongoose";

export const getAllOrderFromDB = async (): Promise<IOrder[]> => {
  return OrderModel.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $sort: {
        createdAt: -1, // Sort by the createdAt field in descending order
      },
    },
  ]);
};
export const getRecentOrderFromDB = async (): Promise<IOrder[]> => {
  try {
    const recentOrders = await OrderModel.find().sort({ _id: -1 }).limit(6);
    return recentOrders;
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    throw error;
  }
};

export const getOrdersWithCustomerDetails = async (): Promise<IOrder[]> => {
  try {
    // Fetch orders
    const orders = await OrderModel.find().sort({ _id: -1 }).limit(6);

    // Map the orders and include customer details
    const ordersWithCustomerDetails: any = orders.map(
      (order: Document & IOrder) => {
        const {
          name: name,
          phoneNumber: customerPhone,
          address: customerAddress,
          ...orderDetails
        } = order.toObject();

        return {
          // ...orderDetails,
          name,
          customerPhone,
          customerAddress,
          createdAt: (order as any).createdAt as Date,
        };
      }
    );

    return ordersWithCustomerDetails;
  } catch (error) {
    console.error("Error fetching orders with customer details:", error);
    throw error;
  }
};

export const getOrderByIdFromDB = async (id: string): Promise<IOrder[]> => {
  return OrderModel.find({ _id: id });
};

export const getOrderByStatus = async (data: string): Promise<IOrder[]> => {
  return OrderModel.find({ status: data });
};

export const getOrderBySearch = async (param: string): Promise<IOrder[]> => {
  try {
    const orders = OrderModel.find({
      $or: [
        { tracking_ID: `/${param}/` },
        { name: `/${param}/` },
        { phoneNumber: `/${param}/` },
        { _id: `/${param}/` },
        { status: `/${param}/` },
      ],
    });

    return orders;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while searching for orders.');
  }
};

export const createOrderFromDB = async (data: IOrder): Promise<IOrder> => {
  const user = new OrderModel(data); //User -> class  user -> instance
  await user.save();
  return user;
};

export const updateOrderStatusFromDB = async (
  id: ObjectId,
  data: string
): Promise<IOrder> => {
  const updateStatus = await OrderModel.findByIdAndUpdate(
    { _id: id },
    { status: data },
    {
      new: true,
    }
  );

  return updateStatus as IOrder;
};

export const updateOrderTrackingIDFromDB = async (
  id: ObjectId,
  data: string
): Promise<IOrder> => {
  const updateStatus = await OrderModel.findByIdAndUpdate(
    { _id: id },
    { tracking_ID: data },
    {
      new: true,
    }
  );
  return updateStatus as IOrder;
};

export const getAllOrderSummarizeFromDB = async (): Promise<IOrder[]> => {
  return OrderModel.aggregate([
    {
      $facet: {
        statusCounts: [
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ],
        TotalPrices: [
          {
            $group: {
              _id: null,
              totalPriceSum: { $sum: "$totall_price" },
            },
          },
        ],
        TotallOrder: [
          {
            $group: {
              _id: null,
              totalOrder: { $sum: 1 },
            },
          },
        ],
        TotallCustomer: [
          {
            $group: {
              _id: "$phoneNumber", // Group by the phoneNumber field
              count: { $sum: 1 }, // Count the number of occurrences of each phoneNumber
            },
          },
          {
            $group: {
              _id: null, // Group all results into a single group
              TotallCustomer: { $sum: 1 }, // Count the number of unique phone numbers
            },
          },
        ],
      },
    },
  ]);
};

export const orderDateFilter = async (
  selectedFilter: string
): Promise<IOrder[]> => {
  const pipeline = [];

  // Define date filters
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const last7DaysStart = new Date();
  last7DaysStart.setDate(last7DaysStart.getDate() - 7);
  last7DaysStart.setHours(0, 0, 0, 0);

  const lastMonthStart = new Date();
  lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
  lastMonthStart.setHours(0, 0, 0, 0);

  // Apply the selected filter based on user input
  if (selectedFilter === "Today") {
    pipeline.push({
      $match: {
        createdAt: {
          $gte: todayStart,
          $lte: todayEnd,
        },
      },
    });
  } else if (selectedFilter === "Last 7 Days") {
    pipeline.push({
      $match: {
        createdAt: {
          $gte: last7DaysStart,
          $lte: todayEnd,
        },
      },
    });
  } else if (selectedFilter === "Last Month") {
    pipeline.push({
      $match: {
        createdAt: {
          $gte: lastMonthStart,
          $lte: todayEnd,
        },
      },
    });
  }

  // Perform the aggregation using Mongoose
  const result = await OrderModel.aggregate(pipeline);

  return result;
};
