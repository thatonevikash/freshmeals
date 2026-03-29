import { app } from "./app";
import { ENV } from "./configs/env-variables";
import { connectDB } from "./database";

// -------------------------------------------------------------

connectDB()
  .then(() => {
    app.listen(ENV.PORT, () =>
      console.log(`Running at https://localhost:${ENV.PORT}`),
    );
  })
  .catch((err) => console.log(`Database connection failed : ${err}`));
