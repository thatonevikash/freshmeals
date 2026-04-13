import type {
  IOrderItem,
  IOrderSchema,
  OrderStatus,
} from "../models/order.model";
import type { IUserSchema } from "../models/user.model";
import type { IMealSchema } from "../models/meal.model";
import type { IPlateSchema } from "../models/plate.model";

import type { UserDto } from "./user.dto";
import { toMealDto, type MealDto } from "./meal.dto";
import { toPlateDto, type PlateDto } from "./plate.dto";

// -------------------------------------------------------------

export type OrderItem =
  | { type: "Meal"; meal: MealDto; quantity: number }
  | { type: "Plate"; plate: PlateDto; quantity: number };

export type CustomerDto = Omit<UserDto, "email" | "is_registered_seller">;

export interface OrderDto {
  order_items: OrderItem[];
  order_status: OrderStatus;
  order_date: Date;
  customer: CustomerDto;
  delivery_information: {
    address: string;
    mobile_no: string;
  };
}

// -------------------------------------------------------------

export function toCustomerDto(customer: IUserSchema): CustomerDto {
  return {
    id: customer._id.toString(),
    name: customer.name,
    avatar_url: customer.avatar_url,
  };
}

export function toOrderDto(order: IOrderSchema): OrderDto {
  const customer = order.customer as unknown as IUserSchema;

  return {
    order_status: order.order_status,
    order_date: order.order_date,
    order_items: order.order_items.map((item: IOrderItem) => {
      if (item.type === "Meal") {
        const meal = item.meal as unknown as IMealSchema;

        return {
          type: "Meal",
          quantity: item.quantity,
          meal: toMealDto(meal),
        };
      } else {
        const plate = item.plate as unknown as IPlateSchema;

        return {
          type: "Plate",
          quantity: item.quantity,
          plate: toPlateDto(plate),
        };
      }
    }),
    customer: toCustomerDto(customer),
    delivery_information: {
      address: order.delivery_information.address,
      mobile_no: order.delivery_information.mobile_no,
    },
  };
}
