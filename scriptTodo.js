//selectors
const subBtn = document.querySelector(".submit-form");
const nameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const idInput = document.querySelector("#itemId");
const records = document.querySelector(".total-records");
const completedRecords = document.querySelector(".compled-records");
const deleteAll = document.querySelector(".delete-all");

//local data
let data = [];
let dataComplete = [];
const clearFields = () => {
  nameInput.value = "";
  emailInput.value = "";
  idInput.value = "";
};

function showText() {
  if (data.length === 0) {
    records.innerHTML = `<p class="text-center text-danger m-0 fw-bold">No records to show</p>`;
    deleteAll.setAttribute("disabled", "");
  }
  if (dataComplete.length === 0) {
    completedRecords.innerHTML = `<p class="text-center text-danger m-0 fw-bold">No completed records to show</p>`;
  }
}
showText();

//submit function add/edit records
const handleSubmit = (e) => {
  e.preventDefault();
  if (nameInput.value === "" || emailInput.value === "") {
    alert("Please fill all the fields");
    return;
  }
  let details = {};
  details.name = nameInput.value;
  details.email = emailInput.value;
  details.id = idInput.value;

  const repeatitive = () => {
    details = {};
    clearFields();
    getRecords();
  };
  if (details.id) {
    const updated = data.map((item) =>
      item.id === details.id ? details : item
    );
    data = updated;
    repeatitive();
    deleteAll.removeAttribute("disabled", "");
    document.querySelectorAll(".btn-parent").forEach((item) => {
      if (item.classList.contains("btn-danger")) {
        item.removeAttribute("disabled", "");
      }
    });
    return;
  }
  details.id = Math.random().toString(16).slice(2);
  data.push(details);
  repeatitive();
  deleteAll.removeAttribute("disabled", "");
};

//submit button event
subBtn.addEventListener("submit", handleSubmit);
//show records
const getRecords = () => {
  let htmlData = "";
  data.forEach((item) => {
    htmlData += `<div class="item justify-content-between" id="${item.id}">
    <div>${item.name}</div>
    <div>${item.email}</div>
    <div class="btn-parent">
    <button class="btn btn-sm btn-info" id="${item.id}">Edit</button>
    <button class="btn btn-sm btn-danger" id="${item.id}">Delete</button>
    <button class="btn btn-sm btn-success" id="${item.id}">Complete</button>
    </div></div>`;
  });
  records.innerHTML = htmlData;
};

const getCompleted = () => {
  let htmlData = "";
  dataComplete.forEach((item) => {
    htmlData += `<div class="item gap-2" id="${item.id}">
    <div>${item.name}</div>
    <div>${item.email}</div>
    </div></div>`;
    console.log(htmlData);
  });
  completedRecords.innerHTML = htmlData;
};

//edit/delete records
records.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-danger")) {
    const id = e.target.id;
    const updatedData = data.filter((item) => item.id !== id);
    data = updatedData;
  } else if (e.target.classList.contains("btn-info")) {
    e.target
      .closest(".btn-parent")
      .querySelector(".btn-danger")
      .setAttribute("disabled", "");
    deleteAll.setAttribute("disabled", "");
    const EditId = e.target.id;
    const editedData = data.filter((item) => item.id === EditId);
    let { name, email, id } = editedData[0];
    nameInput.value = name;
    emailInput.value = email;
    idInput.value = id;
    return;
  }
  //completed
  else if (e.target.classList.contains("btn-success")) {
    const id = e.target.id;
    const completedData = data.filter((item) => item.id === id);
    const updatedData = data.filter((item) => item.id !== id);
    console.log(completedData, updatedData);
    data = updatedData;
    dataComplete.push(completedData[0]);
  } else {
    return;
  }
  getRecords();
  getCompleted();
  showText();
});

deleteAll.addEventListener("click", function () {
  data = [];
  getRecords();
  showText();
});
