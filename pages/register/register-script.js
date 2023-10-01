let usersData = [];
if (JSON.parse(localStorage.getItem("usersData"))) {
  usersData = JSON.parse(localStorage.getItem("usersData"));
}
function userRegister(event) {
  event.preventDefault();

  let firstName = event.target.querySelector("#first-name-input");
  let firstNameError = event.target.querySelector("#first-name-error");
  let lastName = event.target.querySelector("#last-name-input");
  let lastNameError = event.target.querySelector("#last-name-error");
  let email = event.target.querySelector("#email-input");
  let emailError = event.target.querySelector("#email-error");
  let password = event.target.querySelector("#password-input");
  let passwordError = event.target.querySelector("#password-error");
  let repassword = event.target.querySelector("#repassword-input");
  let repasswordError = event.target.querySelector("#repassword-error");

  let isValidFirstName = false;
  let isValidLastName = false;
  let isValidEmail = false;
  let isValidPassword = false;
  let isValidRePassword = false;


  if (!checkIfUserAlreadyHaveAccount(email, repasswordError)) {
    isValidFirstName = checkValidFirstName(firstName, firstNameError);
    isValidLastName = checkValidLastName(lastName, lastNameError);
    isValidEmail = checkValidEmail(email, emailError);
    isValidPassword = checkValidPassword(password, passwordError);
    isValidRePassword = checkValidRePassword(
      repassword,
      repasswordError,
      password
    );
  }


  if (
    isValidEmail &&
    isValidPassword &&
    isValidFirstName &&
    isValidLastName &&
    isValidRePassword
  ) {
    let user = {
      id: Math.floor(Math.random() * 100),
      name: `${firstName.value} ${lastName.value}`,
      email: email.value,
      password: password.value,
      photos: [],
      videos: [],
    };
    usersData.push(user);
    location.replace("../index/index.html");
    localStorage.setItem("usersData", JSON.stringify(usersData));
    sessionStorage.setItem("currentUser", JSON.stringify(user));


  }
}

function checkValidFirstName(firstName, firstNameError) {
  if (!firstName.value) {
    firstNameError.innerText = "Please enter your first name";
    firstNameError.classList.remove("visually-hidden");
    return false;
  } else if (firstName.value.includes(" ")) {
    firstNameError.innerText =
      "Please enter a valid name, name can not contain spaces";
    firstNameError.classList.remove("visually-hidden");
    return false;
  } else {
    firstNameError.classList.add("visually-hidden");
    return true;
  }
}

function checkValidLastName(lastName, lastNameError) {
  if (!lastName.value) {
    lastNameError.innerText = "Please enter your last name";
    lastNameError.classList.remove("visually-hidden");
    return false;
  } else if (lastName.value.includes(" ")) {
    lastNameError.innerText =
      "Please enter a valid name, name can not contain spaces";
    lastNameError.classList.remove("visually-hidden");
    return false;
  } else {
    lastNameError.classList.add("visually-hidden");
    return true;
  }
}

function checkValidEmail(email, emailError) {
  let check = email.value.match(/^[a-zA-Z0-9\.-_]+@[a-z]+\.[a-z]+$/gi);

  if (!email.value) {
    emailError.innerText = "Please enter your email";
    emailError.classList.remove("visually-hidden");
    return false;
  } else if (!check) {
    emailError.innerText =
      "Please enter a valid email, email can only contain letters, numbers and special characters dot: '.' , dash: '-' , underscore: '_'";
    emailError.classList.remove("visually-hidden");
    return false;
  } else if (check) {
    emailError.classList.add("visually-hidden");
    return true;
  }
}

function checkValidPassword(password, passwordError) {
  if (!password.value) {
    passwordError.innerText = "Please enter your password";
    passwordError.classList.remove("visually-hidden");
    return false;
  } else if (password.value.length < 8) {
    passwordError.innerText = "Please enter at least 8 char";
    passwordError.classList.remove("visually-hidden");
    return false;
  } else if (password.value.length >= 8) {
    passwordError.classList.add("visually-hidden");
    return true;
  }
}

function checkValidRePassword(repassword, repasswordError, password) {
  if (!repassword.value) {
    repasswordError.innerText = "Please confirm your password";
    repasswordError.classList.remove("visually-hidden");
    return false;
  } else if (repassword.value != password.value) {
    repasswordError.innerText = "Passwords should be matched";
    repasswordError.classList.remove("visually-hidden");
    return false;
  } else if (repassword.value == password.value) {
    repasswordError.classList.add("visually-hidden");
    return true;
  }
}

function checkIfUserAlreadyHaveAccount(email, repasswordError) {
  let found = usersData.find((item) => item.email == email);

  if (found == undefined) {
    repasswordError.innerText = "this email already registered";
    repasswordError.classList.remove("visually-hidden");
    return false;
  } else {
    repasswordError.classList.add("visually-hidden");
    return true;
  }
}

function togglePassword(name) {
  let password = document.getElementById(`${name}-input`);
  let passwordIcon = document.getElementById(`${name}-icon`);

  if (password.type == "text") {
    password.type = "password";
  } else if (password.type == "password") {
    password.type = "text";
  }

  passwordIcon.classList.toggle("fa-eye-slash");
  passwordIcon.classList.toggle("fa-eye");
}
