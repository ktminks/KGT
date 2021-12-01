export const setLocalStorage = (id) => {
  try {
    localStorage.setItem("kittenID", id);
    return true;
  } catch (e) { console.error(e); }
  return false;
};

export const getLocalStorage = () => localStorage.getItem("kittenID");

const isSameAsLocalStorage = (id) => {
  // get data from local storage
  const kittenID = getLocalStorage();
  // if nothing is in local, return false
  if (!kittenID) return false;
  // if something is in local, continue
  // if data matches, return the idea
  if (kittenID !== id) return kittenID;
  // otherwise, they must be the same. return false
  return false;
};

export const getPrevState = (id) => { // kittens, kitten, index
  // compare state to local storage
  const sameAsLocal = isSameAsLocalStorage(id);
  // if local contains a different ID, return that ID
  if (sameAsLocal) return sameAsLocal;
  // if they are the same, return id as is
  return id;
};
