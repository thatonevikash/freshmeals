import mongoose, { Schema, Document, Types } from "mongoose";
import { SellerSchema, type ISeller } from "./seller.model";

// -------------------------------------------------------------

export interface IPlate {
  plate_name: string;
  plate_price: string;
  plate_img_url?: string;
  plate_items: Types.ObjectId[];
  seller_information: ISeller;
}

export interface IPlateDocument extends IPlate, Document {}

// -------------------------------------------------------------

const PlateSchema = new Schema<IPlateDocument>(
  {
    plate_name: {
      type: String,
      required: [true, "plate name is required"],
      trim: true,
      lowercase: true,
    },
    plate_price: { type: String, required: true, default: "0" },
    plate_img_url: { type: String, default: null },
    plate_items: [
      {
        type: Schema.Types.ObjectId,
        ref: "meal",
        required: [true, "atleast one item should in the plate"],
      },
    ],
    seller_information: SellerSchema,
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

export const PlateModel = mongoose.model<IPlateDocument>("plate", PlateSchema);
