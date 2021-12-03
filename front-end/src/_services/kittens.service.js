import * as local from "./localStorage.service";
import KittenDataService from "./data.service";

// get kitten from local storage or from db
export const getKittenById = (id) => (id || null);

export const getCurrentKitten = () => local.getLocalStorage();
export const saveCurrentKitten = (id) => local.setLocalStorage(id);

export const retrieveKittens = async () => {
  const dbKittens = await KittenDataService.getAll()
    .then((res) => (res ? res.data : null)).catch((e) => console.error(e));
  // const localKittens = await getPrevState({ kittens: dbKittens });

  // const kittens = localKittens || { kittens: dbKittens, currentIndex: 0 };
  const kittens = { newKittens: dbKittens, newIndex: 0 };
  return kittens;
};

export const getKittenIndex = async (id, kittens) => {
  if (!id) return null;

  let newKittens;
  if (kittens) (newKittens = kittens);
  else ({ newKittens } = await retrieveKittens());
  const index = newKittens.findIndex((kitten) => kitten.id === id);
  return index;
};

export const searchKittens = async (searchTerm) => {
  const { newKittens } = await retrieveKittens();
  const filteredKittens = newKittens.filter((e) => e.name === searchTerm);
  if (filteredKittens.length >= 0) console.log("Kitten found!");
  else console.log("Kitten not found!");
  // setLocalStorage(filteredKittens, 0);

  return { foundKittens: filteredKittens };
};

export const resetKittens = async () => retrieveKittens()
  .then(({ newKittens }) => ({ newKittens }))
  .catch((err) => console.error(err));

export const deleteKitten = async (id) => KittenDataService.delete(id)
  .then((res) => {
    console.log(res.data.message);
    return true;
  }).catch((e) => console.error(e));

export const addKitten = async (data) => KittenDataService.create(data).then((res) => {
  const { message, newKitten } = res.data;
  console.log(message);
  return newKitten || false;
}).catch((err) => console.error(err));

export const editKitten = async (kitten, data) => {
  const { newSex: sex, newName: name } = data;
  const newKitten = { ...kitten, sex, name };
  return KittenDataService.update(kitten.id, newKitten)
    .then((res) => {
      const { message, updatedKitten } = res.data;
      console.log(message);
      if (updatedKitten) return { ...updatedKitten, ...newKitten };
      return false;
    }).catch((err) => console.error(err));
};
