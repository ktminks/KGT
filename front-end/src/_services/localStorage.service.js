export const setLocalStorage = (kittens, currentIndex) => {
  localStorage.setItem("kittens", JSON.stringify(kittens));
  localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
};

const getLocalStorage = () => {
  const kittens = JSON.parse(localStorage.getItem("kittens"));
  const currentIndex = JSON.parse(localStorage.getItem("currentIndex"));
  return { kittens, currentIndex };
};

const isSameAsLocalStorage = (state) => {
  // store only the ID of the current kitten
  // don't save list or index

  // get data from local storage
  const { kittens: localKittens, currentIndex: localIndex } = getLocalStorage();
  // if nothing is in local, return false
  if (!localKittens) return false;
  // if something is in local, destructure local data
  const { kittens, currentIndex } = state;
  // if data matches, return true
  if (localKittens !== kittens) return false;
  if (localIndex === currentIndex) return true;
  // otherwise, they must be different. return false
  return false;
};

const getPrevState = (state) => { // kittens, kitten, index
  // compare state to local storage
  const sameAsLocal = isSameAsLocalStorage(state);
  // if they are the same, return state as is
  if (sameAsLocal) return state;
  // if they are not the same, check if anything is in local
  const { kittens, currentIndex } = getLocalStorage();
  // if so, return data from local
  if (kittens && currentIndex >= 0) {
    return { kittens, currentIndex };
  }
  if (kittens) return { kittens, currentIndex: 0 };
  // if not, return false (no prev state)
  return false;
};

export default getPrevState;
