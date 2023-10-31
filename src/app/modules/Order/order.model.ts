import mongoose, { Schema, Document, Types } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>(
  {
    name: {
      type: String,
      required: true
    },
    tracking_ID:{
      type: String
    },
    phoneNumber: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    productId: [{
      type: Schema.Types.ObjectId,
      ref: "Product"
    }],
    quantity: [{ type: Number, required: true }],
    shipping_cost: { type: Number, required: true },
    totall_price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "cancelled", "processing",'confirmed', 'shipped', "delivered", "return"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const OrderModel = mongoose.model<IOrder & Document>(
  "orders",
  orderSchema
);
