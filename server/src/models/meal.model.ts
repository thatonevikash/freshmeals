import mongoose, { Document, Schema } from "mongoose";
import { SellerSchema, type ISeller } from "./seller.model";

// -------------------------------------------------------------

export interface IMeal {
  meal_name: string;
  meal_price: string;
  meal_img_url: string | null;
  seller_information: ISeller;
}

export interface IMealSchema extends IMeal, Document {}

// -------------------------------------------------------------

const MealSchema = new Schema<IMealSchema>(
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
    meal_img_url: { type: String, default: null },
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

export const MealModel = mongoose.model<IMealSchema>("meal", MealSchema);
