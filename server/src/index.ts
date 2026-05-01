import { ENV } from "./configs/env-variables.js";

import { app } from "./app.js";
import { connectDB } from "./database/index.js";

// -------------------------------------------------------------

connectDB()
  .then(() => {
    app.listen(ENV.PORT, () =>
      console.log(`Running at https://localhost:${ENV.PORT}`),
    );
  })
  .catch((err) => {
    console.log(`Database connection failed : ${err}`);
    process.exit(1);
  });
