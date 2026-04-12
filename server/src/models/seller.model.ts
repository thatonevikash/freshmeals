import { Document, Schema, Types } from "mongoose";

// -------------------------------------------------------------

export type SellerLevel = "" | "Beginner" | "Intermediate" | "Elite";

export interface ISeller {
  seller: Types.ObjectId;
  seller_level: SellerLevel;
}

export interface ISellerSchema extends ISeller, Document {}

// -------------------------------------------------------------

export const SellerSchema = new Schema<ISellerSchema>(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    seller_level: {
      type: String,
      enum: ["", "Beginner", "Intermediate", "Elite"],
      default: "",
    },
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
