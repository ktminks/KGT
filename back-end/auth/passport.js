import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";

export default function initPassport(app) {
  let userProfile;

  function googleAuth() {
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const callback = "http://localhost:4000/api/auth/google/callback";

    // Use the GoogleStrategy within Passport.
    //   Strategies in Passport require a `verify` function, which accept
    //   credentials (in this case, an accessToken, refreshToken, and Google
    //   profile), and invoke a callback with a user object.
    passport.use(new GoogleStrategy({
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: callback,
    },
    ((accessToken, refreshToken, profile, done) => {
      userProfile = profile;
      return done(null, userProfile);
    })));
  }

  app.use(passport.initialize());
  app.use(passport.session());

  googleAuth();

  app.get("/success", (req, res) => {
    // console.dir(req.session);
    res.redirect("/");
  });
  app.get("/failure", (req, res) => res.send("error logging in"));

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
}
