import { fileURLToPath } from "url";
import app from "./App.js";
import { connectDB } from "./db.js";
import { PORT } from "./config.js";
import engine from "ejs-mate";
import path from "path";
import rutaEstudiante from './rutas/rutaEstudiante.js'
import apiController from "./apiController.js";


//settings
app.set("views", path.join(fileURLToPath(import.meta.url), "..", "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");

connectDB();

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

app.use(rutaEstudiante);
app.use(apiController);
