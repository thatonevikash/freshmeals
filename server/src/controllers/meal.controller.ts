import type { Request, Response } from "express";

// -------------------------------------------------------------

// meal controllers
// -------------------------------------------------------------

export async function createMeal(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function getMeal(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function deleteMeal(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function updateMeal(req: Request, res: Response) {}

// -------------------------------------------------------------

// plate controllers
// -------------------------------------------------------------

export async function createMealPlate(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function getMealPlate(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function deleteMealPlate(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function updateMealPlate(req: Request, res: Response) {}

// -------------------------------------------------------------

// collection controllers
// -------------------------------------------------------------

export async function getRecentOrderedMeals(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function getMostOrderedMeals(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function getMostOrderedPlates(req: Request, res: Response) {}

// -------------------------------------------------------------

export async function orderMeal(req: Request, res: Response) {}
