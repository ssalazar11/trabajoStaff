import express from "express";
//import authRoutes from "./routes/auth.Routes.js";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import cors from 'cors';
import { configureLocalStrategy } from "./passport/local.auth.js";
import flash from "connect-flash";
import fileUpload from "express-fileupload";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

//Initializations
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//middlewares
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "increible",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.signupMessage = req.flash("signupMessage");
  res.locals.signinMessage = req.flash("signinMessage");
  res.locals.user = req.user;
  next();
});

//configure local strategy
configureLocalStrategy();

//routes
app.use(cors())
/* app.use(productsRoutes);
app.use(incomesRoutes);
app.use(expensesRoutes);
app.use(usersRoutes);
//app.use(authRoutes);
app.use(express.static(join(__dirname, "../client/build")));


app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../client/build/index.html"));
});
*/
export default app;
