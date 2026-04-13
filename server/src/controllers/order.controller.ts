import type { Request, Response } from "express";

import { MealModel as Meal } from "../models/meal.model";
import { PlateModel as Plate } from "../models/plate.model";
import { OrderModel as Order, type IOrderItem } from "../models/order.model";

// -------------------------------------------------------------

export async function getOrder(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function makeAnOrder(req: Request, res: Response) {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized: No User ID found" });
      return;
    }

    const { order_items, delivery_information } = req.body;

    if (!order_items || order_items.length < 1) {
      res.status(400).json({ message: "Can not proceed with empty items" });
      return;
    }

    if (!delivery_information.mobile_no || !delivery_information.address) {
      res.status(400).json({ message: "Delivery informations are required" });
      return;
    }

    const resolvedItems = order_items.map(async (item: IOrderItem) => {
      if (item.type === "Meal") {
        const meal = await Meal.findById(item.meal);

        if (!meal) {
          res.status(404).json({ message: "Meal not found" });
          return;
        }

        return {
          meal: item.meal,
          type: item.type,
          quantity: item.quantity,
        };
      } else if (item.type === "Plate") {
        const plate = await Plate.findById(item.plate);

        if (!plate) {
          res.status(404).json({ message: "Plate not found" });
          return;
        }

        return {
          plate: item.plate,
          type: item.type,
          quantity: item.quantity,
        };
      }
    });

    const newOrder = await Order.create({
      delivery_information,
      customer: req.userId,
      order_items: resolvedItems,
    });

    const order = await Order.findById(newOrder._id).populate({
      path: "customer",
      model: "user",
      select: "id name avatar_url",
    });

    if (!order) {
      res.status(500).json("Unable to make an entry on db");
      return;
    }

    res.status(201).json(order);
    return;
  } catch (error) {
    res.status(500).json({ message: "Unable to make an order" });
    return;
  }
}

// -------------------------------------------------------------

export async function getOrders(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function updateOrder(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function cancelOrder(req: Request, res: Response) {}
