import type { Request, Response } from "express";

// -------------------------------------------------------------

export async function createMeal(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function getMeals(req: Request, res: Response) {
  return res.status(200).json([
    { name: "Rice", price: 10 },
    { name: "Pulse", price: 5 },
    { name: "Mix-Veg", price: 6 },
  ]);
}

// -------------------------------------------------------------

export async function getMeal(req: Request, res: Response) {
  const { name } = req.params;

  if (!name) return res.status(404).send("Provide a valid meal name");

  return res.json({ name, price: 8 }).status(200);
}

// -------------------------------------------------------------

export async function deleteMeal(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function updateMeal(req: Request, res: Response) {}
