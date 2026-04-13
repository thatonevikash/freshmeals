import type { IMealSchema } from "../models/meal.model";
import type { SellerLevel } from "../models/seller.model";
import type { IUserSchema } from "../models/user.model";

import {
  toSellerInformationDto,
  type SellerInformationDto,
} from "./seller.dto";

// -------------------------------------------------------------

export interface MealDto {
  id: string;
  meal_name: string;
  meal_img_url: string | null;
  meal_price: string;
  seller_information: SellerInformationDto;
}

// -------------------------------------------------------------

export function toMealDto(meal: IMealSchema): MealDto {
  const seller_information = meal.seller_information as unknown as {
    seller: IUserSchema;
    seller_level: SellerLevel;
  };

  return {
    id: meal._id.toString(),
    meal_name: meal.meal_name,
    meal_price: meal.meal_price,
    meal_img_url: meal.meal_img_url,
    seller_information: toSellerInformationDto(seller_information),
  };
}
