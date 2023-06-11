import dotenv from "dotenv";
//import passport from "./passport/local.auth.js";

dotenv.config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/testdb";

export const PORT = process.env.PORT || 4000;

// Configuración de Passport.js
// passport.initialize();
// passport.session();
