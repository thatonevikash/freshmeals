import type { Request, Response } from "express";

import { MealModel as Meal } from "../models/meal.model";
import { PlateModel as Plate } from "../models/plate.model";
import { OrderModel as Order, type IOrderItem } from "../models/order.model";

import { toOrderDto } from "../dtos/order.dto";

import { ORDER_POPULATE_OPTIONS } from "../configs/populate-options";

// -------------------------------------------------------------

export async function getOrder(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function placeOrder(req: Request, res: Response) {
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

    const resolvedItems = await Promise.all(
      order_items.map(async (item: IOrderItem) => {
        if (item.type === "Meal") {
          const meal = await Meal.findById(item.meal);
          if (!meal) {
            throw { status: 404, message: "Meal not found" };
          }
          return {
            meal: item.meal,
            type: item.type,
            quantity: item.quantity,
          };
        }
        if (item.type === "Plate") {
          const plate = await Plate.findById(item.plate);
          if (!plate) {
            throw { status: 404, message: "Plate not found" };
          }
          return {
            plate: item.plate,
            type: item.type,
            quantity: item.quantity,
          };
        }
        throw { status: 400, message: "Invalid order item type" };
      }),
    );

    const newOrder = await Order.create({
      delivery_information,
      customer: req.userId,
      order_items: resolvedItems,
    });

    const order = await Order.findById(newOrder._id).populate(
      ORDER_POPULATE_OPTIONS,
    );

    if (!order) {
      res.status(500).json("Unable to make an entry on db");
      return;
    }

    res.status(201).json(toOrderDto(order));
    return;
  } catch (error) {
    res.status(500).json({ message: "Unable to place an order" });
    return;
  }
}

// -------------------------------------------------------------

export async function getOrders(req: Request, res: Response) {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized: No User ID found" });
      return;
    }

    const orders = await Order.find({ customer: req.userId })
      .populate(ORDER_POPULATE_OPTIONS)
      .sort({ createdAt: -1 });

    if (!orders) {
      res.status(500).json({ message: "Unable to fetch orders" });
    }

    res.status(200).json(orders.map(toOrderDto));
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch orders" });
    return;
  }
}

// -------------------------------------------------------------

export async function updateOrder(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function cancelOrder(req: Request, res: Response) {}
