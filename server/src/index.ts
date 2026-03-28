import { app } from "./app";
import { ENV } from "./configs/env-variables";

// -------------------------------------------------------------

app.listen(ENV.PORT, () =>
  console.log(`Running at https://localhost:${ENV.PORT}`),
);
