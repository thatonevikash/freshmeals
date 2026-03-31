import mongoose, { Schema, Document } from "mongoose";

// -------------------------------------------------------------

interface IMealItem {
  meal_id: mongoose.Types.ObjectId | string;
  meal_name: string;
}

export interface IPlate {
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
        meal_id: {
          type: Schema.Types.ObjectId,
          ref: "meal",
          required: true,
        },
        meal_name: { type: String, required: true },
      },
    ],
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
