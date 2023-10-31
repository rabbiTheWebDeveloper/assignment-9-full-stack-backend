import { Document, Types } from "mongoose";
export interface IOrder extends Document {
  name: string;
  // order_id: number;
  phoneNumber: string;
  address: string;
  tracking_ID: string;
  status: string;
  productId: Types.ObjectId;
  quantity: number;
  shipping_cost: number;
  totall_price: number;
}

export interface IOrderWithCustomer extends IOrder {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
}
