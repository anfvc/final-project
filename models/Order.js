import { Schema, model } from "mongoose";
import { addressSchema } from "./Address.js";

export const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "OrderItem",
      },
    ],
    status: {
      type: String,
      default: "pending",
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    deliveryAddress: addressSchema,
  },
  {
    versionKey: false,
  }
);

const Order = model("Order", orderSchema);

export default Order;
