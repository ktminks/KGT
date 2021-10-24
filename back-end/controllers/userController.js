import { users as User } from "../models/index.js";
import verify from "../_helpers/auth.js";

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
  return "Something went wrong with the error handler.";
};

const verifyTokens = async (req) => {
  const cookie = req.cookies.g_csrf_token;
  const body = req.body.g_csrf_token;
  if (!cookie) errorHandler({ status: 400, message: "No CSRF token in Cookie." });
  if (!body) errorHandler({ status: 400, message: "No CSRF token in post body." });
  if (cookie !== body) errorHandler({ status: 400, message: "Failed to verify double submit cookie." });
  req.user = await verify(req.body.credential).catch(console.error);
  return !!req.user;
};

const getUserIfItExists = async (gid) => {
  const user = await User.findOne({ gid }).exec();
  console.log(user);
  return user || false;
};

const createUser = async (data) => {
  const user = new User(data);
  return user.save(user);
};

const googleLogin = async (req, res, next) => {
  try {
    await verifyTokens(req);

    if (req.user) {
      const { gid } = req.user;
      const exists = await getUserIfItExists(gid);
      // console.log(exists);

      if (exists) res.locals.message = "You are already signed up.";
      else {
        const saved = await createUser(req.user);
        if (saved) res.locals.message = "You are now signed up.";
        else res.locals.message = "Something went wrong.";
      }
    }
  } catch (err) {
    errorHandler(err, req, res, next);
  }
  next();
};

export default googleLogin;
