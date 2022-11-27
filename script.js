"use strict";

const resetBtn = document.querySelector(".reset");
const form = document.querySelector(".signup-form");

if (form) {
  resetBtn.addEventListener("click", function (e) {
    e.preventDefault();
    form.querySelectorAll("input").forEach((input) => {
      input.value = "";
      input.checked = false;
    });
  });
}

/* **************************************************************************************** */
function checkDuplicate(a, b) {
  const arr = b.filter((val) => !a.includes(val));
  console.log("received inputs");
  console.log(a, b);
  console.log("filtered array");
  return arr;
}
console.log(
  "Task Remove duplicate item from array -----------------------------------------------"
);
console.log(checkDuplicate(["1", "2", "3", "4"], ["5", "6", "3", "4"]));

console.log(
  checkDuplicate(
    ["1", "2", "3", "4", "5", "6"],
    ["5", "6", "3", "4", "10", "11"]
  )
);
/* **************************************************************************************** */

const randomCard = document.querySelector(".random-card");
let names = ["Abhi", "Ajay", "Bharath"];
let arrStatus = true;
if (randomCard) {
  let htmlContent = "";
  names.forEach(
    (item, index) =>
      (htmlContent += `<label for="${index}" >${
        index + 1
      } input</label><input id='${index}' class="mt-2 mb-3 input"/> `)
  );
  randomCard.innerHTML = `${htmlContent} <button class="btn btn-success">Next</button> <span class="text-danger fw-bold mt-2 output text-start"></span>`;

  //   function hasClass(elem, className) {
  //     return elem.className.split(" ").indexOf(className) > -1;
  //   }

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-success")) {
      randomCard.querySelectorAll(".input").forEach((input, index) => {
        if (!input.value) {
          randomCard
            .querySelectorAll(".input")
            .forEach((input) => input.classList.remove("input-highlight"));
          document.querySelector(".output").textContent = "";
          arrStatus = false;
          alert(`Please fill the input ${index + 1}`);
          return;
        }
        arrStatus = true;
      });
      if (arrStatus) {
        let randomVal = Math.floor(Math.random() * names.length);
        randomCard
          .querySelectorAll(".input")
          .forEach((input) => input.classList.remove("input-highlight"));
        document
          .getElementById(`${randomVal}`)
          .classList.add("input-highlight");
        ("1px solid #ff3f42");
        document.querySelector(
          ".output"
        ).textContent = `Random highlighted input value is ${
          document.getElementById(`${randomVal}`).value
        }`;
      }
    }
  });
}

const arrayCard = document.querySelector(".array-content");
const arrayBtn = document.querySelector(".btn-primary");
if (arrayCard) {
  let cardInput = document.getElementById("input");
  arrayBtn.addEventListener("click", function (e) {
    const inputVal = cardInput.value;
    if (!inputVal) {
      alert("enter value");
      return;
    }

    let storeVal = [...inputVal];
    if (!storeVal.includes(",")) {
      alert("check console for the value");
      console.log(
        "Task random array -------------------------------------------------"
      );
      console.log(storeVal);
      return;
    }
    console.log(
      "Task random array -------------------------------------------------"
    );
    alert("check console for the value");
    console.log(inputVal.split(","));
    return;
  });
}
