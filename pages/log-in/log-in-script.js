function userLogIn(event) {
  event.preventDefault();

  let email = event.target.querySelector("#email-input");
  let emailError = event.target.querySelector("#email-error");
  let password = event.target.querySelector("#password-input");
  let passwordError = event.target.querySelector("#password-error");
  let emailCheck = email.value.match(/^[a-zA-Z0-9]+@[a-z]+\.[a-z]{3}$/gi);
  let isValidEmail = false;
  let isValidPassword = false;

  if (!email.value) {
    emailError.innerText = "Please enter your email";
    emailError.classList.remove("visually-hidden");
  } else if (!emailCheck) {
    emailError.innerText = "Please enter a valid email";
    emailError.classList.remove("visually-hidden");
  } else if (emailCheck) {
    emailError.classList.add("visually-hidden");
    isValidEmail = true;
  }

  if (!password.value) {
    passwordError.innerText = "Please enter your password";
    passwordError.classList.remove("visually-hidden");
  } else if (password.value.length < 8) {
    passwordError.innerText = "Please enter at least 8 char";
    passwordError.classList.remove("visually-hidden");
  } else if (password.value.length >= 8) {
    passwordError.classList.add("visually-hidden");
    isValidPassword = true;
  }

  if (isValidEmail && isValidPassword) {
    let check = checkIfDataFoundInLocalStorage(email.value, password.value);

    if (check == true) {
      location.replace("../index/index.html");
    } else {
      passwordError.innerText = check;
      passwordError.classList.remove("visually-hidden");
    }
  }
}

function checkIfDataFoundInLocalStorage(email, password) {
  let users = JSON.parse(localStorage.getItem("usersData"));
  let result = "";
  if (users != null) {
    let foundUser = users.find((item) => item.email == email);
    if (foundUser) {
      if (foundUser.password == password) {
        result = true;
        sessionStorage.setItem("currentUser", JSON.stringify(foundUser));
      } else {
        result = "Please check your password and try again";
      }
    } else {
      result = "This user does not have account";
    }
  } else {
    result = "This user does not have account";
  }
  return result;
}

function togglePassword() {
  let password = document.getElementById("password-input");
  let passwordIcon = document.getElementById("password-icon");

  if (password.type == "text") {
    password.type = "password";
  } else if (password.type == "password") {
    password.type = "text";
  }

  passwordIcon.classList.toggle("fa-eye-slash");
  passwordIcon.classList.toggle("fa-eye");
}
