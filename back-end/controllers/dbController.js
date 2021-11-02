/* eslint-disable no-underscore-dangle */
// everything querying the database goes here
// query DB, return data in cookie or response object

import { users as User } from "../models/index.js";
import errorHandler from "../_helpers/errorHandler.js";

// -------------------- Handle user CRUD functions ----------------------------

// array of guest users
const guests = [];

// ------------- Utilities----------------

const findUserById = async (gid) => {
  const user = await User.findOne({ gid }).exec();
  return user || false;
};

const createUser = async (data) => {
  const user = new User(data);
  return user.save(user);
};

const setUserCookie = async (req, res, user, index) => {
  if (user) {
    const alteredKittenIndex = index || null;
    const {
      id, gid, name, email, kittens,
    } = user;
    const updatedUser = {
      alteredKittenIndex, id, gid, name, email, kittens,
    };
    req.user = updatedUser;
  }
};

export async function checkDBForUser(req, res, next) {
  try {
    const { user: profile } = req.session.passport;
    if (profile) {
      const { id: gid, emails: { 0: { value: email } }, name: { givenName: name } } = profile;
      const exists = await findUserById(gid);

      if (exists) {
        setUserCookie(req, res, exists);
        console.log("You are already signed up.");
      } else {
        const user = {
          gid, name, email, kittens: [],
        };
        const saved = await createUser(user);
        if (saved) {
          setUserCookie(req, res, saved);
          console.log("You are now signed up.");
        } else console.log("Something went wrong.");
      }
    }
    next();
  } catch (err) { errorHandler(err, req, res, next); }
}

const isOnGuestList = (guestID) => guests.findIndex((g) => g.id === guestID);

const makeGuestUser = async (id) => {
  const template = await findUserById(0);
  const { name, email, kittens } = template;
  const guestUser = {
    id, gid: null, name, email, kittens,
  };
  return guestUser;
};

export async function getUser(req, res, next) {
  try {
    // return user if it exists, otherwise set flag
    if (req.session.passport) {
      const { user } = req.session.passport;
      const dbUser = user ? await findUserById(user.id) : null;
      if (dbUser) setUserCookie(req, res, dbUser);
    } else {
      // otherwise, create & return guest user
      // add to array of guest users, use session ID as id
      const { id } = req.session;
      const index = isOnGuestList(id);
      if (index < 0) {
        const guest = await makeGuestUser(id);
        if (guest) {
          guests.push(guest);
          setUserCookie(req, res, guest);
        }
      } else setUserCookie(req, res, guests[index]);
    }
  } catch (err) { next(new Error("Something went wrong.")); }
  next();
}

export async function updateUser(user) {
  const { kittens } = user;

  const index = isOnGuestList(user.id);
  if (index) {
    guests[index].kittens = kittens;
    return guests[index];
  }

  const filter = { gid: user.gid };
  const update = { kittens };
  return User.findOneAndUpdate(filter, update, { new: true }).exec();
}

// -------------------- Handle kitten CRUD functions ----------------------------
async function manageKittens(req, res, next, message, index) {
  try {
    const { user } = req;
    const updatedUser = user ? await updateUser(user) : null;
    if (updatedUser) setUserCookie(req, res, updatedUser, index);
    next();
    // else res.send({ message });
  } catch (err) { errorHandler(err, req, res, next); }
}

export async function createKitten(req, res, next) {
  const index = req.user.kittens.length - 1;
  const message = "There was a problem adding the new kitten.";
  manageKittens(req, res, next, message, index);
}

export async function updateKitten(req, res, next) {
  const index = req.user.alteredKittenIndex;
  const message = "There was a problem updating the kitten.";
  manageKittens(req, res, next, message, index);
}

export async function deleteKitten(req, res, next) {
  const message = "There was a problem deleting this kitten.";
  manageKittens(req, res, next, message);
}
