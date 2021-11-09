/* eslint-disable no-underscore-dangle */
// everything querying the database goes here
// query DB, return data

import { users as User } from "../models/index.js";

async function getDBUserByGid(gid) {
  const user = await User.findOne({ gid }).exec();
  return user || false;
}

const createUser = async (profile) => {
  const {
    id: gid, emails: { 0: { value: email } }, name: { givenName: name },
  } = profile;
  const user = new User({
    gid, name, email, kittens: [],
  });
  return user.save(user);
};

export async function getOrCreateDBUser(profile) {
  try {
    // check if user exists in DB
    const userExists = await getDBUserByGid(profile.id);
    // if user exists, return user
    if (userExists) return userExists;

    // else create and return new user
    await createUser(profile)
      .then(({ data: newUser }) => {
        console.log("You are now signed up.");
        return newUser;
      });
  } catch (err) { console.log(err); }
  return null;
}

export async function updateDBUser(user) {
  const { kittens } = user;
  const filter = { gid: user.gid };
  const update = { kittens };
  return User.findOneAndUpdate(filter, update, { new: true }).exec();
}
