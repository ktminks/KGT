import passport from "passport";
import { Strategy } from "passport-oauth2-jwt-bearer";
// import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
// import BearerStrategy from "passport-http-bearer";
// import { users as User } from "../models/index.js";

const Google = () => {
//   console.log(req.body);
//   const { credential, g_csrf_token: token } = req.body;
  // const GOOGLE_CLIENT_ID = "843196960554-8lss663jtiigovh3tkqse44eqohvvf5g.apps.googleusercontent.com";
  // const GOOGLE_CLIENT_SECRET = "teQCgdeuLqvHFrL8phiRsMwn";

  // passport.use(new GoogleStrategy({
  //   clientID: GOOGLE_CLIENT_ID,
  //   clientSecret: GOOGLE_CLIENT_SECRET,
  //   callbackURL: "http://localhost:4000/auth/googleLogin",
  //   scope: ["profile"],
  // },
  // (accessToken, refreshToken, profile, done) => done(null, profile)));
  passport.use(new Strategy(
    (credential, claimSetIss, done) => (err, client) => {
      if (err) { return done(err); }
      if (!client) { return done(null, false); }
      return done(null, client);
    },
  ));
};

const Facebook = (req, res, next) => {
  const data = req.body;
  passport.authenticate();
  next();
};

export { Google, Facebook };
