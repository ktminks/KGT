import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import checkMode from "../_helpers/checkMode.js";

const initGoogleAuth = () => {
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const mode = checkMode();
  const callback = (mode.toLowerCase() === "development")
    ? "http://localhost:4000/api/auth/google/callback"
    : "https://kgt.ktminks.com/api/auth/google/callback";

  // Use the GoogleStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and Google
  //   profile), and invoke a callback with a user object.
  passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: callback,
  },
  ((accessToken, refreshToken, profile, done) => done(null, profile))));
};

export default function initPassport(app) {
  app.use(passport.initialize());
  app.use(passport.session());
  initGoogleAuth();

  passport.serializeUser((user, cb) => { cb(null, user); });
  passport.deserializeUser((obj, cb) => { cb(null, obj); });
}
