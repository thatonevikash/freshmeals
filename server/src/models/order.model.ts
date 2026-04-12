import mongoose, { Document, Schema, Types } from "mongoose";

// -------------------------------------------------------------

export interface IOrderItem {
  meal_id?: Types.ObjectId;
  plate_id?: Types.ObjectId;
  meal_type: "Item" | "Plate";
  quantity: number;
}

export type OrderStatus = "Processing" | "Canceled" | "Approved" | "Delivered";

export interface IOrder {
  order_items: IOrderItem[];
  order_status: OrderStatus;
  order_date: Date;
  user_information: Types.ObjectId;
  delivery_information: {
    mobile_no: string;
  };
}

export interface IOrderDocument extends IOrder, Document {}

// -------------------------------------------------------------

const OrderItemSchema = new Schema<IOrderItem>({
  meal_id: { type: Schema.Types.ObjectId, ref: "meal" },
  plate_id: { type: Schema.Types.ObjectId, ref: "plate" },
  meal_type: {
    type: String,
    enum: ["Item", "Plate"],
    default: "Item",
    required: true,
  },
  quantity: { type: Number, default: 0 },
});

const OrderSchema = new Schema<IOrderDocument>(
  {
    order_items: [OrderItemSchema],
    order_status: {
      type: String,
      enum: ["Processing", "Canceled", "Approved", "Delivered"],
      default: "Processing",
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
    user_information: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    delivery_information: {
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

export const OrderModel = mongoose.model<IOrderDocument>("order", OrderSchema);
