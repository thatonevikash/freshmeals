import mongoose, { Document, Schema } from "mongoose";

// -------------------------------------------------------------

export interface IMeal {
  meal_name: string;
  meal_price: string;
  meal_img_url?: string;
}

export interface IMealDocument extends IMeal, Document {
  _id: mongoose.Types.ObjectId;
  meal_id: String;
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
