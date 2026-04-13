import type { IMealSchema } from "../models/meal.model";
import type { IPlateSchema } from "../models/plate.model";
import type { SellerLevel } from "../models/seller.model";
import type { IUserSchema } from "../models/user.model";

import type { MealDto } from "./meal.dto";
import {
  toSellerInformationDto,
  type SellerInformationDto,
} from "./seller.dto";

// -------------------------------------------------------------

export type PlateItemDto = Omit<MealDto, "meal_price" | "seller_information">;

export interface PlateDto {
  id: string;
  plate_name: string;
  plate_img_url: string | null;
  plate_items: PlateItemDto[];
  plate_price: string;
  seller_information: SellerInformationDto;
}

// -------------------------------------------------------------

export function toPlateDto(plate: IPlateSchema): PlateDto {
  const seller_information = plate.seller_information as unknown as {
    seller: IUserSchema;
    seller_level: SellerLevel;
  };

  const plate_items = plate.plate_items as unknown as IMealSchema[];

  return {
    id: plate._id.toString(),
    plate_name: plate.plate_name,
    plate_items: plate_items.map((item) => ({
      id: item._id.toString(),
      meal_name: item.meal_name,
      meal_img_url: item.meal_img_url,
    })),
    plate_price: plate.plate_price,
    plate_img_url: plate.plate_img_url,
    seller_information: toSellerInformationDto(seller_information),
  };
}
