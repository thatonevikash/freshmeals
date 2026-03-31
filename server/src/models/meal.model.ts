import mongoose, { Document, Schema } from "mongoose";
import type { ISellerInformation } from "./seller.model";

// -------------------------------------------------------------

export interface IMeal extends ISellerInformation {
  meal_name: string;
  meal_price: string;
  meal_img_url?: string;
}

export interface IMealDocument extends IMeal, Document {
  _id: mongoose.Types.ObjectId;
  meal_id: string;
  createdAt: Date;
  updatedAt: Date;
}

// -------------------------------------------------------------

const MealSchema = new Schema<IMealDocument>(
  {
    meal_name: {
      type: String,
      required: [true, "name is required for meal"],
      trim: true,
      lowercase: true,
    },
    meal_price: {
      type: String,
      default: "0",
      required: [true, "price is required for meal"],
    },
    meal_img_url: { type: String },
    seller_information: {
      seller_name: { type: String, required: true },
      seller_avatarUrl: { type: String },
      seller_id: { type: Schema.Types.ObjectId, ref: "user" },
      seller_level: {
        type: String,
        enum: ["", "Beginner", "Intermediate", "Elite"],
        default: "",
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret: any) => {
        ret.meal_id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// -------------------------------------------------------------

export const MealModel = mongoose.model<IMealDocument>("meal", MealSchema);
