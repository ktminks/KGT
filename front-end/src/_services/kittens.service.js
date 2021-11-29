// import getPrevState, { setLocalStorage } from "./localStorage.service";
import KittenDataService from "./data.service";

export const retrieveKittens = async () => {
  const dbKittens = await KittenDataService.getAll()
    .then((res) => (res ? res.data : null)).catch((e) => console.error(e));
  // const localKittens = await getPrevState({ kittens: dbKittens });

  // const kittens = localKittens || { kittens: dbKittens, currentIndex: 0 };
  const kittens = { newKittens: dbKittens, newIndex: 0 };
  console.log(kittens);
  return kittens;
};

export const searchKittens = async (searchTerm) => {
  console.log(searchTerm);
  const { kittens } = await retrieveKittens();
  await KittenDataService.findByName(searchTerm)
    .then((res) => {
      const { message, foundKitten } = res.data; // causing issues
      if (!foundKitten) return null;
      console.log(message);
      const filteredKittens = kittens.filter((e) => e.id === foundKitten.id);
      // setLocalStorage(filteredKittens, 0);

      return {
        kittens: filteredKittens,
        currentKitten: filteredKittens[0],
        currentIndex: 0,
      };
    }).catch((e) => console.error(e));
  return null;
};

// export const resetKittens = async (e, currentKitten) => {
//   if (e) e.preventDefault();
//   await retrieveKittens()
//     .then((kittens) => {
//       if (currentKitten) setActiveKitten(currentKitten, null, kittens);
//       return kittens;
//     }).catch((err) => console.error(err));
// };

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
      console.log(res.data);
      const { message, updatedKitten } = res.data;
      console.log(message);
      if (updatedKitten) return { ...updatedKitten, ...newKitten };
      return false;
    }).catch((err) => console.error(err));
};
