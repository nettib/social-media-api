import app from "./src/app.js";
import connectToDB from "./src/database/mongodb.js";
import { PORT } from "./src/config/env.js";

connectToDB(() =>
  app.listen(PORT, async () => {
    console.log(`Listening to the server at port ${PORT}`);
  })
);
