import app from "./app.js";
import { ENV } from "./configs/envConfig.js";

// PORT
const PORT = ENV.PORT || 8080;

// LISTEN
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
