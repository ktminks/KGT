let Litters = [];

stringifyDate = (daysAgo) => {
  date = new Date();
  date.setDate(date.getDate() - daysAgo);
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yy = date.getFullYear();
  date = mm + "/" + dd + "/" + yy;
  return date;
};

class Litter {
  constructor(
    name = "default",
    numKittens = 0,
    breed = "mix/unknown",
    dob = 0
  ) {
    this.id = Litters.length + 1;
    this.name = name;
    this.numKittens = numKittens;
    this.breed = breed;
    this.dob = dob;
    this.kittens = [];
    Litters.push(this);
  }
  printLitter = () => {
    let stringifyKittens = ``;
    this.kittens.forEach((kitten) => {
      stringifyKittens += kitten.printKitten();
    });
    return `<div class="litter d-flex justify-content-evenly flex-wrap">
                    <div class="litter-info d-flex flex-column justify-content-center">
                        <h2>Litter</h2> 
                        <h3>${this.name}</h3><br>
                        <div class="litter-data">
                            <div class="d-flex justify-content-between flex-wrap data">
                                <p>Birth date:</p>
                                <p>${this.dob}</p>
                            </div>
                            <div class="d-flex justify-content-between flex-wrap data">
                                <p>Breed:</p>
                                <p>${this.breed}</p>
                            </div>
                            <div class="d-flex justify-content-between flex-wrap data">
                                <p>Size:</p>
                                <p>${this.numKittens}</p>
                            </div>
                        </div>
                    </div>
                    <div class="kittens-info d-flex flex-column justify-content-center">
                        <h2>Kittens</h2>
                        ${stringifyKittens}
                    </div>
                </div>`;
  };
}

class Kitten {
  constructor(
    litterId = 0,
    name = "default",
    breed = "mix/unknown",
    weight = 0,
    eyes = "",
    ears = "",
    eating = "",
    litterTrained = true,
    gender = "unknown",
    age = 0,
    dob = 0
  ) {
    const today = stringifyDate(0);
    let litter = Litters.find((litter) => litter.id === litterId);
    litter.kittens.push(this);
    this.kittenNum = litter.kittens.length;
    this.id =
      litterId.toString() +
      this.kittenNum
        .toLocaleString("en-US", { minimumIntegerDigits: 2 })
        .toString();
    this.name = name;
    this.breed = breed;
    this.gender = gender;
    this.milestones = {
      weight: [[today, weight]],
      eyes: eyes,
      ears: ears,
      eating: eating,
      "litter-trained": litterTrained,
    };

    if (dob > 0) {
      this.dob = dob;
      this.age = parseInt(dob) - parseInt(today);
    } else if (age > 0) {
      // calculate dob from age
      this.age = age;
      this.dob = stringifyDate(age);
    }
  }
  printMilestones = () => {
    return `<div class="kittens-data d-flex flex-column">
                    <div class="d-flex justify-content-between flex-wrap data">
                        <p>Date:</p>
                        <p>${this.milestones.weight[0][0]}</p>
                    </div>
                    
                    <div class="d-flex justify-content-between flex-wrap data">
                        <p>Weight:</p>
                        <p>${this.milestones.weight[0][1]}g</p>
                    </div>
                    
                    <div class="d-flex justify-content-between flex-wrap data">
                        <p>Eyes:</p>
                        <p>${this.milestones.eyes}</p>
                    </div>
                    
                    <div class="d-flex justify-content-between flex-wrap data">
                        <p>Ears:</p>
                        <p>${this.milestones.ears}</p>
                    </div>
                    
                    <div class="d-flex justify-content-between flex-wrap data">
                        <p>Eating:</p>
                        <p>${this.milestones.eating}</p>
                    </div>
                </div>`;
  };
  printKitten = () => {
    return `<p>Kitten #${this.kittenNum}: ${this.name}</p>
                <p>Age: ${Math.floor(this.age / 7)} weeks</p>
                <h3>milestones:</h3>
                <div class="milestones d-flex justify-content-evenly flex-wrap">
                    <div class="last-reported mx-2">
                        <h4>Last reported:</h4>
                        ${this.printMilestones()}
                    </div>
                    <div class="should-be mx-2">
                        <h4>Kitten should be:</h4>
                        ${this.printMilestones()}
                    </div>
                </div>`;
  };
}

let MarxStrays = new Litter("Marx Strays", 1);
let Thumper = new Kitten(
  1,
  "Thumper",
  "mix/unknown",
  650,
  "open",
  "upright",
  "kitten-food",
  true,
  "male",
  39
);

estimateAge = (kitten, min = 0, max = 999, weightCheck = false) => {
  if (max - min <= 7) {
    kitten.age = Math.floor((max + min) / 2);
    console.log(
      `${kitten.name} is approximately ${Math.floor(kitten.age / 7)} weeks old!`
    );
    return;
  } else if (kitten.milestones.weight.length > 0 && weightCheck == false) {
    let weight = kitten.milestones.weight[0][1]; // in grams
    if (weight > 2600) {
      // cat is probably at least 6 months
    } else {
      if (weight < 850)
        estimateAge(kitten, (weight - 150) / 14, (weight - 100) / 14, true);
    }
  } else {
    // adjust minimum
    if (kitten.milestones["litter-trained"]) {
      // at least a few weeks
    } else {
      // must be very young
    }
  }
};

printKittens = () => {
  const kittenContainer = document.querySelector("#kittens");
  if (kittenContainer) {
    let printedLitters = "";
    printAllLitters = (litter) => (printedLitters += litter.printLitter());
    Litters.map(printAllLitters);
    kittenContainer.innerHTML = printedLitters;
  }
};

$(document).ready(() => {
  printKittens();
  const $num = $("#numKittens");
  $num
    .change(() => {
      let allKittens = ``;
      for (let i = 1; i <= $num.val(); i++) {
        let $kittenForm = `<div>
                                    <p>Kitten #${i}:</p>
                                </div>
                                <div class="d-flex justify-content-between flex-wrap">
                                    <div>
                                        <label for="kittenName" class="col-form-label">Name:</label>
                                    </div>
                                    <div>
                                        <input type="text" class="form-control" value="Kitten${i}" name="kittenName" aria-describedby="nicknameHelpInline" required>
                                    </div>
                                </div>`;
        allKittens += $kittenForm;
      }
      $("#kittensDetails").html(allKittens);
    })
    .change();
});
