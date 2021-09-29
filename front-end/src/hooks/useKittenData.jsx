<<<<<<< Updated upstream
getDate = (days) => {
  // accept # days, return date that this kitten will be that age
  const dob = new Date(JSON.parse(this.birthdate));
  let date = new Date(dob);
  date.setDate(dob.getDate() + days);
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yy = date.getFullYear();
  date = mm + "/" + dd + "/" + yy;
  return date;
};

getAge = (dob) => {
  const today = new Date();
  return (age = Math.ceil((today - dob) / (1000 * 60 * 60 * 24)));
};
=======
import { useState } from "react";

function useKittenData(kittens) {
  const [kittensList, fetchData] = useState(kittens);

  const fetchKittens = (kittens) => {
    fetchData(kittens);
    console.log("Fetching the new kitten...");
  };

  return { kittensList, fetchKittens };
}

export default useKittenData;
>>>>>>> Stashed changes
