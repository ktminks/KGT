import { users as User } from "../models/index.js";

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

export const findUserById = async (gid) => {
  const user = await User.findOne({ gid }).exec();
  return user || false;
};

const createUser = async (data) => {
  const user = new User(data);
  return user.save(user);
};

export const googleLogin = async (req, res, next) => {
  try {
    const { user: profile } = req.session.passport;
    if (profile) {
      const { id: gid, emails: { 0: email }, name: { given_name: name } } = profile;
      const exists = await findUserById(gid);

      if (exists) {
        console.log("You are already signed up.");
      } else {
        const user = { gid, name, email };
        const saved = await createUser(user);
        if (saved) {
          console.log("You are now signed up.");
        } else console.log("Something went wrong.");
      }
    }
    req.session.save();
    next();
  } catch (err) {
    errorHandler(err, req, res, next);
  }
};
