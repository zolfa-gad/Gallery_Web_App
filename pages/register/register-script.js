let usersData = [];
if (JSON.parse(localStorage.getItem("usersData"))) {
  usersData = JSON.parse(localStorage.getItem("usersData"));
}
function userRegister(event) {
  event.preventDefault();
  // console.log(event.target.querySelector("#email-input"));

  let name = event.target.querySelector("#name-input");
  let nameError = event.target.querySelector("#name-error");
  let email = event.target.querySelector("#email-input");
  let emailError = event.target.querySelector("#email-error");
  let password = event.target.querySelector("#password-input");
  let passwordError = event.target.querySelector("#password-error");
  let repassword = event.target.querySelector("#repassword-input");
  let repasswordError = event.target.querySelector("#repassword-error");

  let isValidName = false;
  let isValidEmail = false;
  let isValidPassword = false;
  let isValidRePassword = false;

  //   console.log(checkIfUserAlreadyHaveAccount(email, repasswordError));

  if (!checkIfUserAlreadyHaveAccount(email, repasswordError)) {
    isValidName = checkValidName(name, nameError);
    isValidEmail = checkValidEmail(email, emailError);
    isValidPassword = checkValidPassword(password, passwordError);
    isValidRePassword = checkValidRePassword(
      repassword,
      repasswordError,
      password
    );
  }

  // should check if he alreday has an account

  if (isValidEmail && isValidPassword && isValidName && isValidRePassword) {
    // console.log(string[0].toUpperCase() + string.slice(1));
    let user = {
      id: Math.floor(Math.random() * 100),
      name: name.value[0].toUpperCase() + name.value.slice(1),
      email: email.value,
      password: password.value,
      // favourites: [],
      photos: [],
      videos: [],
    };
    usersData.push(user);
    location.replace("../index/index.html");
    localStorage.setItem("usersData", JSON.stringify(usersData));
    sessionStorage.setItem("currentUser", JSON.stringify(user));

    // push user to local storage
    // let check = checkIfDataFoundInLocalStorage(email.value, password.value);
    // if (check == true) {
    //   location.replace("index.html");
    // } else {
    //   passwordError.innerText = check;
    //   passwordError.classList.remove("visually-hidden");
    // }
    // check in local storage
    // if (checkIfDataFoundInLocalStorage(email)) {
    //   location.replace("index.html");
    // }
  }
}

function checkValidName(name, nameError) {
  let check = name.value.match(/^[a-zA-Z]+ [a-zA-Z]+$/gi);
  if (!name.value) {
    nameError.innerText = "Please enter your name";
    nameError.classList.remove("visually-hidden");
    return false;
  } else if (!check) {
    nameError.innerText = "Please enter a valid name first and last name";
    nameError.classList.remove("visually-hidden");
    return false;
  } else {
    nameError.classList.add("visually-hidden");
    return true;
  }
}

function checkValidEmail(email, emailError) {
  let check = email.value.match(/^[a-zA-Z0-9]+@[a-z]+\.[a-z]{3}$/gi);

  if (!email.value) {
    emailError.innerText = "Please enter your email";
    emailError.classList.remove("visually-hidden");
    return false;
  } else if (!check) {
    emailError.innerText = "Please enter a valid email";
    emailError.classList.remove("visually-hidden");
    return false;
  } else if (check) {
    emailError.classList.add("visually-hidden");
    return true;
    // isValidEmail = true;
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
    // isValidPassword = true;
  }
}

function checkValidRePassword(repassword, repasswordError, password) {
  if (!repassword.value) {
    repasswordError.innerText = "Please enter your password again";
    repasswordError.classList.remove("visually-hidden");
    return false;
  } else if (repassword.value != password.value) {
    repasswordError.innerText = "Please enter a matched password";
    repasswordError.classList.remove("visually-hidden");
    return false;
  } else if (repassword.value == password.value) {
    repasswordError.classList.add("visually-hidden");
    return true;
  }
}

function checkIfUserAlreadyHaveAccount(email, repasswordError) {
  let found = usersData.find((item) => item.email == email);
  console.log(found, "found email");

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
