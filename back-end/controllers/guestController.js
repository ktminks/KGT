const guests = [];
const guestTemplate = {
  gid: null,
  name: "Guest",
  email: "guest@kgt.ktminks.com",
  kittens: [],
};

const getIndexInGuestList = (guestID) => guests.findIndex((g) => g.id === guestID);

const getGuestFromTemplate = (id) => {
  const {
    gid, name, email, kittens,
  } = guestTemplate;
  return {
    id, gid, name, email, kittens,
  };
};

const createGuestUser = (id) => {
  // create new guest user
  const newGuest = getGuestFromTemplate(id);
  // add to array of guest users
  guests.push(newGuest);
  return newGuest;
};

export const getOrCreateGuestUser = (id) => {
  // check if guest user with this ID exists
  const index = getIndexInGuestList(id);

  // return existing guest or create a new one
  const guestUser = (index >= 0)
    ? guests[index]
    : createGuestUser(id);

  return guestUser;
};

export const isGuest = (id) => getIndexInGuestList(id) >= 0;

export const updateGuest = (id, kittens) => {
  const index = getIndexInGuestList(id);
  if (kittens.length < 3) guests[index].kittens = kittens;
  return guests[index];
};
