// import getPrevState, { setLocalStorage } from "./localStorage.service";
import KittenDataService from "./data.service";

export const retrieveKittens = async () => {
  const dbKittens = await KittenDataService.getAll()
    .then((res) => (res ? res.data : null)).catch((e) => console.error(e));
  // const localKittens = await getPrevState({ kittens: dbKittens });

  // const kittens = localKittens || { kittens: dbKittens, currentIndex: 0 };
  const kittens = { kittens: dbKittens, currentIndex: 0 };
  console.log(kittens);
  return kittens;
};

export const setActiveKitten = (kitten, i, kittens) => {
  let index;
  if (!i && kittens) index = kittens.findIndex((k) => k.id === kitten.id);
  else index = i;
  // setLocalStorage(kittens, index);
  return { kittens, currentKitten: kitten, currentIndex: index };
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

export const resetKittens = (e, currentKitten) => {
  if (e) e.preventDefault();
  retrieveKittens()
    .then((kittens) => {
      if (currentKitten) setActiveKitten(currentKitten, null, kittens);
      return kittens;
    }).catch((err) => console.error(err));
};

export const deleteKitten = async (id, kittens, setKittens, refresh, history) => {
  KittenDataService.delete(id)
    .then((res) => {
      console.log(res.data.message);
      const filteredKittens = kittens.filter((k) => k.id !== id);
      setKittens(filteredKittens);
      history.push("/kittens");
      refresh();
    }).catch((e) => console.error(e));
};

export const addKitten = async (data, kittens, setKittens, history, refresh) => {
  KittenDataService.create(data).then((res) => {
    const { message, newKitten } = res.data;
    console.log(message);
    if (newKitten) {
      console.log(kittens);
      setKittens({ ...kittens, newKitten });
      refresh();
      history.goBack();
    }
  }).catch((err) => console.error(err));
};
