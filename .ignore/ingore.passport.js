// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import User from "../server/models/User.js";

// // Configuración de la estrategia de autenticación local
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "username", // Nombre del campo del formulario de inicio de sesión que contiene el nombre de usuario
//       passwordField: "password", // Nombre del campo del formulario de inicio de sesión que contiene la contraseña
//     },
//     async (username, password, done) => {
//       try {
//         // Buscar el usuario en la base de datos
//         const user = await User.findOne({ username });

//         // Verificar si el usuario existe y si la contraseña es correcta
//         if (!user || !user.comparePassword(password)) {
//           return done(null, false, { message: "Invalid username or password" });
//         }

//         // El usuario ha sido autenticado correctamente
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// // Función de serialización del usuario
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // Función de deserialización del usuario
// passport.deserializeUser(async (id, done) => {
//   try {
//     // Buscar el usuario en la base de datos
//     const user = await User.findById(id);

//     if (!user) {
//       return done(null, false);
//     }

//     // El usuario ha sido deserializado correctamente
//     return done(null, user);
//   } catch (error) {
//     return done(error);
//   }
// });

// export default passport;
