import sanitize from "../_helpers/sanitize.js";
import getKitten from "../_helpers/getKitten.js";

export const getKittenData = (data) => data.map((k) => getKitten(k));

// Retrieve all kittens from the user
export const getAllKittens = (kittens) => getKittenData(kittens);

export const findByIndex = (user) => {
  const { kittens, alteredKittenIndex } = user;
  if (kittens && alteredKittenIndex) return getKitten(kittens[alteredKittenIndex]);
  return null;
};

// Find a single Kitten with an id
export const findById = (id, kittens) => kittens.find((k) => k.id === id);

export const findByName = (name, kittens) => kittens.find((k) => k.name.includes(name));

// Create a new kitten
export const makeNewKitten = (data, index, kittens) => {
  const { birthdate, name, sex } = data;
  const newData = {
    birthdate,
    name: name.toLowerCase(),
    sex: sex.toLowerCase(),
    id: (index + 1).toString(),
  };
  kittens.push(newData);
  return { ...getKitten(newData) };
};

// Update a Kitten by the id in the request
export const editKitten = async (kittens, data) => {
  // sanitize data from update form
  const cleanData = await sanitize(data);
  const { id } = cleanData;

  // find kitten to be updated
  const foundKitten = kittens.find((k) => k.id === id);

  if (foundKitten) {
    // update kitten
    Object.keys(cleanData).map((key) => (foundKitten[key] = data[key]));

    return foundKitten;
  } return null;
};

// Delete a Kitten with the specified id in the request
const remove = (kittens, id) => {
  const index = kittens.findIndex((k) => k.id === id);
  if (index >= 0) kittens.splice(index, 1);
};
export { remove as delete };
