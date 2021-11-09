/* eslint-disable import/no-named-as-default-member */
import passport from "passport";

const getLoginStatus = (req) => {
  const status = { isLoggedIn: false, user: null };
  try {
    status.isLoggedIn = req.user ? req.user.gid : false;
    status.user = status.isLoggedIn ? req.user : null;
  } catch (err) { console.log(err); }
  return status;
};

const googleLogin = (req, res, next) => {
  passport.authenticate("google", { session: true, scope: ["profile", "email"] })(req, res, next);
};
const googleLoginCallback = (req, res, next) => {
  passport.authenticate("google", { failureRedirect: "/login" })(req, res, next);
};
// const logout = () => { passport.googleLogout(); };

export { getLoginStatus, googleLogin, googleLoginCallback };
