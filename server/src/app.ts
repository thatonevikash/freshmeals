import express from "express";
import userRoutes from "./routes/user.routes";
import mealRoutes from "./routes/meal.routes";

// -------------------------------------------------------------

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/meal", mealRoutes);

export { app };
