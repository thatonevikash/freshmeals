import { User } from "@/auth/context/auth-provider";

// -------------------------------------------------------------

export type Seller = {
  seller: Pick<User, "id" | "name" | "avatar_url">;
  seller_level: string;
};

// -------------------------------------------------------------

export interface Meal {
  id: string;
  meal_name: string;
  meal_price: string;
  meal_img_url: string;
  seller_information: Seller;
}

// -------------------------------------------------------------

export interface MealPlate {
  id: string;
  plate_name: string;
  plate_price: string;
  plate_img_url: string;
  plate_items: Omit<Meal, "meal_price" | "seller_information">[];
  seller_information: Seller;
}
