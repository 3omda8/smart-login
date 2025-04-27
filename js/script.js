const loginWord = document.querySelector("#login");
const createBtn = document.querySelector("#create-btn");
const loginBtn = document.querySelector("#login-btn");
const registerBtn = document.querySelector("#register-btn");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const email = document.querySelector("#email");
const signBtn = document.querySelector("#signBtn");
const signUpWord = document.querySelector("#signUp");
const nameInputField = document.querySelector("#user-field");
const loginField = document.querySelector("#login-field");
const notFound = document.querySelector("#notFound-msg");
const exist = document.querySelector("#exist-msg");
const empty = document.querySelector("#empty-msg");
const cardBody = document.querySelector("#card-body");
const content = document.querySelector("#content");

let usersList;

disableHiddenRequiredInputs();

if (localStorage.getItem("loggedInUser")) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  showLoggedInView(loggedInUser);
}

if (localStorage.getItem("usersList") == null) {
  usersList = [];
} else {
  usersList = JSON.parse(localStorage.getItem("usersList"));
  console.log(usersList);
}

createBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (checkIfUserExists(usersList)) {
    addUser();
  }
});

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  disableHiddenRequiredInputs();
  checkIfAccountExists(usersList);
});

registerBtn.addEventListener("click", () => {
  handleSignUpPage();
});

function handleSignUpPage() {
  signBtn.classList.remove("d-none");
  signBtn.classList.add("d-block");
  signUpWord.classList.remove("d-none");
  signUpWord.classList.add("d-block");
  nameInputField.classList.remove("d-none");
  nameInputField.classList.add("d-block");
  loginWord.classList.remove("d-block");
  loginWord.classList.add("d-none");
  loginField.classList.remove("d-block");
  loginField.classList.add("d-none");
  notFound.classList.add("d-none");
  emptyFields();
}

function addUser() {
  if (handleEmptyFields()) {
    let user = {
      username: username.value.toLowerCase(),
      password: password.value,
      email: email.value.toLowerCase(),
    };
    console.log(user);
    usersList.push(user);
    savetoLocalStorage();
    alert("User registered successfully!");
    goToLoginForm();
    console.log(usersList);
    emptyFields();
  }
}

function savetoLocalStorage() {
  localStorage.setItem("usersList", JSON.stringify(usersList));
}

function emptyFields() {
  username.value = "";
  password.value = "";
  email.value = "";
}

function handleEmptyFields() {
  if (username.value === "" || password.value === "" || email.value === "") {
    empty.classList.remove("d-none");
    empty.classList.add("d-block");
    return false;
  } else {
    empty.classList.remove("d-block");
    empty.classList.add("d-none");
    return true;
  }
}

function goToLoginForm() {
  signUpWord.classList.remove("d-block");
  signUpWord.classList.add("d-none");
  signBtn.classList.remove("d-block");
  signBtn.classList.add("d-none");
  nameInputField.classList.remove("d-block");
  nameInputField.classList.add("d-none");
  loginWord.classList.remove("d-none");
  loginWord.classList.add("d-block");
  loginField.classList.remove("d-none");
  loginField.classList.add("d-block");
}

function checkIfUserExists(usersList) {
  let userExists = usersList.find((user) => {
    return (
      user.username.toLowerCase() === username.value.toLowerCase() ||
      user.email.toLowerCase() === email.value.toLowerCase()
    );
  });
  if (userExists) {
    exist.classList.remove("d-none");
    exist.classList.add("d-block");
    empty.classList.add("d-none");
    return false;
  } else {
    exist.classList.remove("d-block");
    exist.classList.add("d-none");
    return true;
  }
}

function checkIfAccountExists(usersList) {
  let userExists = usersList.find((user) => {
    return (
      user.email.toLowerCase() === email.value.toLowerCase() &&
      user.password.toLowerCase() === password.value.toLowerCase()
    );
  });
  if (userExists) {
    localStorage.setItem("loggedInUser", JSON.stringify(userExists)); // save login
    showLoggedInView(userExists);
    notFound.classList.add("d-none");
    return false;
  } else {
    notFound.classList.add("d-block");
    notFound.classList.remove("d-none");
    return true;
  }
}

function showLoggedInView(user) {
  cardBody.classList.add("d-none");
  content.innerHTML = `
    <h1 class="p-5 text-center text-capitalize">Hi ${user.username}</h1>
    <button id="logout-btn" onclick="goBackToLogin()" class="btn btn-danger mb-3">Log Out</button>
  `;

  // chatgpt method

  // const logoutBtn = document.querySelector("#logout-btn");
  // logoutBtn.addEventListener("click", () => {
  //   localStorage.removeItem("loggedInUser");
  //   location.reload();
  // });
}

function disableHiddenRequiredInputs() {
  const inputs = document.querySelectorAll("input[required]");
  inputs.forEach((input) => {
    if (input.offsetParent === null) {
      input.removeAttribute("required");
    }
  });
}

function goBackToLogin() {
  content.innerHTML = ``;
  localStorage.removeItem("loggedInUser");
  cardBody.classList.remove("d-none");
  cardBody.classList.add("d-block");
  emptyFields();
}
