import errorHandler from "../_helpers/errorHandler.js";

export const googleLogin = async (req, res, next) => {
  try {
    // const { user } = req;
    // console.log(user);
    req.session.save();
    next();
  } catch (err) {
    errorHandler(err, req, res, next);
  }
};

export const login = () => {};
