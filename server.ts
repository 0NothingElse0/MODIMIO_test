import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT;

async function startApp() {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on PORT = ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

startApp();
