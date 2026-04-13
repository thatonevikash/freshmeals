import mongoose, { Document, Schema, Types } from "mongoose";

// -------------------------------------------------------------

export interface IOrderItem {
  meal?: Types.ObjectId;
  plate?: Types.ObjectId;
  type: "Meal" | "Plate";
  quantity: number;
}

export interface IOrderItemSchema extends IOrderItem, Document {}

export type OrderStatus =
  | "Processing"
  | "Canceled"
  | "Delivering"
  | "Delivered";

export interface IOrder {
  order_items: IOrderItem[];
  order_status: OrderStatus;
  order_date: Date;
  customer: Types.ObjectId;
  delivery_information: {
    address: string;
    mobile_no: string;
  };
}

export interface IOrderSchema extends IOrder, Document {}

// -------------------------------------------------------------

const OrderItemSchema = new Schema<IOrderItemSchema>(
  {
    meal: {
      type: Schema.Types.ObjectId,
      ref: "meal",
      required(this: IOrderItemSchema) {
        return this.type === "Meal";
      },
    },
    plate: {
      type: Schema.Types.ObjectId,
      ref: "plate",
      required(this: IOrderItemSchema) {
        return this.type === "Plate";
      },
    },
    type: {
      type: String,
      enum: ["Meal", "Plate"],
      default: "Meal",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
  },
  {
    _id: false,
    toJSON: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  },
);

const OrderSchema = new Schema<IOrderSchema>(
  {
    order_items: [OrderItemSchema],
    order_status: {
      type: String,
      enum: ["Processing", "Canceled", "Delivering", "Delivered"],
      default: "Processing",
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    delivery_information: {
      address: { type: String, required: true },
      mobile_no: { type: String, required: true },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  },
);

// -------------------------------------------------------------

export const OrderModel = mongoose.model<IOrderSchema>("order", OrderSchema);
