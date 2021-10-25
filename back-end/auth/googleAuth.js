import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";

export default function googleAuth(userProfile) {
  const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const callback = "http://localhost:4001/auth/google/callback";

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
