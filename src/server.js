import "dotenv/config";
import app from "./app.js";

// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_NAME:", process.env.DB_NAME);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port http://localhost:${PORT}`);
});
