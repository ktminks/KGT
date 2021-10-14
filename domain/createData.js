import { createKitten } from "./createKitten.js";

export const createData = (data) => data.map((k) => createKitten(k.name, k.sex, k.birthdate, k.id));


// const kittenData = getKitten(name, sex, birthdate, kitten.id);