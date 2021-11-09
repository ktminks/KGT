import * as auth from "../auth/passportMiddleware.js";
import * as db from "../controllers/dbController.js";
import * as kitten from "../controllers/kittenController.js";
import * as guestList from "../controllers/guestController.js";
import * as cookie from "../controllers/cookieController.js";
import errorHandler from "../_helpers/errorHandler.js";

export const redirect = (req, res) => { res.redirect("/"); };

// auth
export const googleLogin = (req, res, next) => auth.googleLogin(req, res, next);

export const googleLoginCallback = (req, res, next) => auth.googleLoginCallback(req, res, next);

export const getUser = async (req, res, next) => {
  try {
    const { user } = req;

    // get DB user if so, get guest user if not
    const updatedUser = user
      ? await db.getOrCreateDBUser(user)
      : guestList.getOrCreateGuestUser(req.session.id);

    // update user cookie with db user or guest user
    cookie.updateUserCookie(req, user, updatedUser);
  } catch (err) { errorHandler(err, req, res, next); }
  next();
};

export const logout = (req, res) => {
  req.logout();
  redirect(req, res);
};

export const getLoginStatus = (req, res, next) => {
  try {
    const loggedIn = req.user.gid;
    const { user } = req;

    if (loggedIn) {
      res.send({ loggedIn, user });
    } else res.send({ loggedIn: false, user: null });
  } catch (err) { errorHandler(err, req, res, next); }
};

const updateUser = async (req, user, errMessage) => {
  const { id, kittens } = user;
  const updatedUser = guestList.isGuest(id)
    // check if user is a guest - if so, update user
    ? guestList.updateGuest(id, kittens)
    // if not, user must be in db - update there
    : await db.updateDBUser(user, errMessage);

  // update user cookie with db user or guest user
  cookie.updateUserCookie(req, user, updatedUser);
};

// -------------------- Handle kitten CRUD functions ----------------------------
const getDataFromBody = (body) => { // get new kitten data
  const {
    birthdate, name, sex, id = "0",
  } = body;
  const data = {
    birthdate, name, sex, id,
  };
  if (!data) throw Error("No data to update!");
  return data;
};

// CREATE
export async function addKitten(req, res, next) {
  const errMessage = "There was a problem adding the new kitten.";
  const successMessage = "Kitten was added successfully!";
  const guestLimit = "Guests are limited to 3 kittens. Please sign in to add more.";

  try {
    // get new kitten data
    const data = getDataFromBody(req.body);

    // get kittens array to update
    const { user, id, kittens } = cookie.getUserFromCookie(req);

    // check for guest user kitten limit
    const index = kittens.length;
    if (index > 2 && guestList.isGuest(id)) {
      res.send({ message: guestLimit });
      return;
    }

    // make new kitten
    const newKitten = kitten.makeNewKitten(data, index, kittens);

    // update user with updated kittens array
    await updateUser(req, user, errMessage);

    // get new kitten in DOM
    res.send({ newKitten, message: successMessage });
  } catch (err) { errorHandler(err, req, res, next); }
}

// READ
export const getAllKittens = async (req, res) => {
  try {
    const { user } = cookie.getUserFromCookie(req);
    const kittens = kitten.getAllKittens(user.kittens);
    res.send(kittens);
  } catch (err) { errorHandler(err, req, res); }
};

export const getOneKitten = (req, res) => {
  try {
    // get search parameters
    const { id, name } = req.params;

    // get list of kittens from cookie
    const { kittens } = cookie.getUserFromCookie(req);

    // search based on parameter found
    const foundKitten = id
      ? kitten.findById(id, kittens)
      : kitten.findByName(name, kittens);
    console.log(foundKitten);
    // return kitten found, or null if no params
    res.send({ foundKitten, message: "Kitten found!" });
  } catch (err) { errorHandler(err, req, res); }
};

// UPDATE
export async function editKitten(req, res) {
  const errMessage = "There was a problem updating the kitten.";
  const successMessage = "Kitten was updated successfully!";
  try {
    // get data to update
    const data = getDataFromBody(req.body);

    // get current user's kittens list
    const { user, kittens } = cookie.getUserFromCookie(req);

    // update kitten in list
    const updatedKitten = await kitten.editKitten(kittens, data);

    // update user with updated kittens array
    await updateUser(req, user, errMessage);

    // get updated kitten in DOM
    res.send({ updatedKitten, message: successMessage });
  } catch (err) { errorHandler(err, req, res); }
}

// DELETE
export async function deleteKitten(req, res) {
  const errMessage = "There was a problem deleting this kitten.";
  try {
    const { id } = req.params;

    // get current user's kittens list
    const { user, kittens } = cookie.getUserFromCookie(req);

    kitten.delete(kittens, id);

    // update user with updated kittens array
    await updateUser(req, user, errMessage);
    res.send({ message: "Kitten was deleted successfully!" });
  } catch (err) { errorHandler(err, req, res); }
}
