import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";


export const configureLocalStrategy = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const user = User.findOne({ email: email }); //Verifica si el correo existe o no
        if (user) {
          return done(
            null,
            false,
            req.flash("signupMessage", "The Email is arledy take.")
          );
        } else {
          const newUser = new User();
          (newUser.email = email),
            (newUser.password = newUser.encryptPassword(password));
          await newUser.save();
          done(null, newUser);
        }
      }
    )
  );

  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, req.flash("signinMessage", "No User Found"));
        }
        if (!user.comparePassword(password)) {
          return done(
            null,
            false,
            req.flash("signinMessage", "Incorrect Password")
          );
        }
        done(null, user);
      }
    )
  );
};
