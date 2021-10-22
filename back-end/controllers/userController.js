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

const getUserIfItExists = async (req, res, next) => {
  const { id } = req.user;
  console.log(req.user);
  try {
    User.find({ id })
      .then((data) => {
        if (data.length) return data[0];
        return false;
      });
  } catch (err) {
    errorHandler(err, req, res, next);
  }
  return false;
};

// const createUser = async (user) => {
//   try {
//     await User.save({ ...user });
//   } catch (err) {
//     throw err;
//   }
// };

const googleLogin = async (req, res, next) => {
  await verifyTokens(req);
  if (req.user) {
    let { user } = req;
    const exists = await getUserIfItExists(req, res, next);
    if (!exists) {
      try {
        user = new User(user);
        await user.save(user);
      } catch (err) {
        errorHandler(err, req, res, next);
      }
    }
  }
  next();
};

export default googleLogin;
