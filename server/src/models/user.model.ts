import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// -------------------------------------------------------------

export interface IUser {
  name: string;
  email: string;
  password: string;
  address?: string;
  pincode?: number;
  mobile_no?: string;
  avatar_url: string | null;
  is_registered_seller: boolean;
}

export interface IUserSchema extends IUser, Document {
  comparePassword(password: string): Promise<boolean>;
}

// -------------------------------------------------------------

const UserSchema = new Schema<IUserSchema>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: { type: String, required: true, select: false },
    address: { type: String, default: null },
    pincode: { type: Number, default: null },
    mobile_no: { type: String, default: null },
    avatar_url: { type: String, default: null },
    is_registered_seller: { type: Boolean, default: false },
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

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// -------------------------------------------------------------

export const UserModel = mongoose.model<IUserSchema>("user", UserSchema);
