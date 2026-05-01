import express, { type Application } from "express";
import cors from "cors";

import routes from "./routes/root.js";

// -------------------------------------------------------------

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------------------------------------------------

app.get("/health", (_, res) =>
  res.status(200).json({ message: "🔴 freshmeals is live" }),
);

app.use("/api", routes);

export { app };
