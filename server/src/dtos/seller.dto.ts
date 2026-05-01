import type { UserDto } from "./user.dto.js";
import type { IUserSchema } from "../models/user.model.js";
import type { SellerLevel } from "../models/seller.model.js";

// -------------------------------------------------------------

export type SellerDto = Omit<UserDto, "email" | "is_registered_seller">;

export interface SellerInformationDto {
  seller: SellerDto;
  seller_level: SellerLevel;
}

// -------------------------------------------------------------

export function toSellerDto(seller: IUserSchema): SellerDto {
  return {
    id: seller._id.toString(),
    name: seller.name,
    avatar_url: seller.avatar_url,
  };
}

export function toSellerInformationDto(sellerInformation: {
  seller: IUserSchema;
  seller_level: SellerLevel;
}): SellerInformationDto {
  return {
    seller: toSellerDto(sellerInformation.seller),
    seller_level: sellerInformation.seller_level,
  };
}
