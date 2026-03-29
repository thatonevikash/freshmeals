import dotenv from "dotenv";

dotenv.config({ quiet: true });

// -------------------------------------------------------------

function readENV(variable: string): string {
  const value = process.env[variable];

  if (!value) {
    throw new Error(`Missing ENV variable : ${variable}`);
  }

  return value;
}

// -------------------------------------------------------------

export const ENV = {
  PORT: readENV("PORT"),
  MONGODB_URI: readENV("MONGODB_URI"),
  JWT_SECRET: readENV("JWT_SECRET"),
};
