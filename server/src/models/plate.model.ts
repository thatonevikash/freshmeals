import mongoose, { Schema, Document } from "mongoose";
import type { ISellerInformation } from "./seller.model";

// -------------------------------------------------------------

interface IMealItem {
  meal_id: mongoose.Types.ObjectId | string;
  meal_name: string;
}

export interface IPlate extends ISellerInformation {
  plate_name: string;
  plate_price: string;
  plate_img_url?: string;
  plate_items: IMealItem[];
}

export interface IPlateDocument extends IPlate, Document {
  _id: mongoose.Types.ObjectId;
  plate_id: String;
  createdAt: Date;
  updatedAt: Date;
}

// -------------------------------------------------------------

const PlateSchema = new Schema<IPlateDocument>(
  {
    plate_name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    plate_price: { type: String, required: true },
    plate_img_url: { type: String },
    plate_items: [
      {
        _id: false,
        meal_id: { type: Schema.Types.ObjectId, ref: "meal", required: true },
        meal_name: { type: String, required: true },
      },
    ],
    seller_information: {
      seller_name: { type: String, required: true },
      seller_avatarUrl: { type: String },
      seller_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
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
        ret.plate_id = ret._id.toString();
        delete ret.__v;
        delete ret._id;
        return ret;
      },
    },
  },
);

// -------------------------------------------------------------

export const PlateModel = mongoose.model<IPlateDocument>("plate", PlateSchema);
