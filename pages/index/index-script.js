const userImageElement =
  '<img id="userImage" src="../../images/anonymous-avatar-icon-25.jpg" width="100%" height="100%" class="rounded-circle" />';

const userLettersElement =
  '<span id="userLetters" class="fs-5 fw-bold text-light"> UN </span>';

const token = "SdaCPFt3E5Z1tam3Ts9kMios6LXoIvexDn9Z4ZP8v8kRmI6AwNaSGw4S";
const baseURL = "https://api.pexels.com/";
const photosSearchEndPoint = "v1/search";
const videosSearchEndPoint = "videos/search";

const navScrollBar = document.getElementById("navSearchBar");
const navTabItems = document.getElementsByClassName("nav-tab-item");
const homeTabItems = document.getElementsByClassName("home-tab-item");
const homeTabList = document.getElementById("homeTabList");
const navSearchInput = document.getElementById("navSearchInput");
const homeSearchInput = document.getElementById("homeSearchInput");
const cardsItemsList = document.getElementById("cardsItems");
const logButton = document.getElementById("log-btn");
const upButton = document.getElementById("go-up-button");
const profileLogo = document.getElementById("profileLogo");

let categoryType = "photos";
let defaultSearch = "sky";
let pageCounter = 1;

let currentUser = null;

//---------------------------------- window load event ------------------------------//
window.addEventListener("load", () => {
  cardsItemsList.innerHTML = "";
  getDataFromAPI(defaultSearch, categoryType);

  if (sessionStorage.getItem("currentUser") != null) {
    currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  }

  if (currentUser == null) {
    logButton.innerText = "Log In";
    currentUser = {
      id: "000",
      name: "Guest",
      email: "",
      password: "",
      photos: [],
      videos: [],
    };
    profileLogo.innerHTML += userImageElement;

    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  } else if (currentUser.id == "000") {
    profileLogo.innerHTML += userImageElement;
    logButton.innerText = "Log In";
  } else {
    let userName = currentUser.name.split(" ").map((item) => item[0]);
    logButton.innerText = "Log Out";
    profileLogo.innerHTML += userLettersElement;
    document.getElementById(
      "userLetters"
    ).innerText = `${userName[0].toUpperCase()}${userName[1].toUpperCase()}`;
  }
});

//---------------------------------- window scroll event ------------------------------//
window.addEventListener("scroll", function () {
  if (window.scrollY >= window.outerHeight * pageCounter) {
    getDataFromAPI(defaultSearch, categoryType);
  }

  if (window.scrollY >= window.innerHeight) {
    upButton.children[0].classList.remove("visually-hidden");
    navScrollBar.classList.remove("visually-hidden");
  } else {
    upButton.children[0].classList.add("visually-hidden");
    navScrollBar.classList.add("visually-hidden");
  }
});

//---------------------------------- window change event ------------------------------//
window.addEventListener("change", function (event) {
  if (event.target.id == "homeSearchInput") {
    onSearchClick("home");
  } else if (event.target.id == "navSearchInput") {
    onSearchClick("nav");
  }

  homeTabList.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "center",
  });
});

//--------------------------------- on seacrh home click ----------------------------//
function onSearchClick(type) {
  pageCounter = 1;
  cardsItemsList.innerHTML = "";

  if (type == "nav") {
    getDataFromAPI(navSearchInput.value, categoryType);
    defaultSearch = navSearchInput.value;
  } else {
    getDataFromAPI(homeSearchInput.value, categoryType);
    defaultSearch = homeSearchInput.value;
  }
}

//---------------------------------- go to profile ------------------------------//
profileLogo.addEventListener("click", () => {
  location.href = "../profile/profile.html";
});

//---------------------------------- get data from api ------------------------------//
async function getDataFromAPI(querySearch, type) {
  let url = "";
  if (type == "photos") {
    url = `${baseURL}${photosSearchEndPoint}?query=${querySearch}&page=${pageCounter}&per_page=15`;
  } else {
    url = `${baseURL}${videosSearchEndPoint}?query=${querySearch}&page=${pageCounter}&per_page=15`;
  }
  pageCounter++;

  await fetch(url, {
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((responseData) => {
      if (type == "photos") {
        categoryType = type;
        displayPhotosCards(responseData.photos);
      } else {
        categoryType = type;

        displayVideosCards(responseData.videos);
      }
    });
}

//---------------------------------- on nav tab click ------------------------------//
function onNavTabClick(self) {
  [...navTabItems].forEach((item) => {
    if (item == self) {
      item.classList.add("active-nav-tab");
    } else {
      item.classList.remove("active-nav-tab");
    }
  });

  if (self.innerText.toLowerCase() != categoryType) {
    onHomeTabClick(self);
  } else {
    homeTabList.scrollIntoView(true, {
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  }
}

//--------------------------------- on home tab click -----------------------------//
function onHomeTabClick(self) {
  [...homeTabItems].forEach((item) => {
    if (item.innerText == self.innerText) {
      item.classList.add("active-home-tab");
    } else {
      item.classList.remove("active-home-tab");
    }
  });

  pageCounter = 1;
  cardsItemsList.innerHTML = "";

  getDataFromAPI(defaultSearch, self.innerText.toLowerCase());

  categoryType = self.innerText.toLowerCase();
}

//---------------------------------- select category change ------------------------------//
function onSelectChange(event) {
  categoryType = event.target.value;
}

//--------------------------------- display photo card -----------------------------//
function displayPhotosCards(photosList) {
  let userPhotos = currentUser.photos;
  let cartona = "";
  for (let i = 0; i < photosList.length; i++) {
    let result = userPhotos.find(({ id }) => id == photosList[i].id);
    let iconClass = "";
    if (result == undefined) {
      iconClass = "fa-regular";
    } else {
      iconClass = "text-danger";
    }

    cartona += ` <div
    class="card rounded-1 p-2 bg-grey-dark text-center d-flex justify-content-between align-items-center"
  >
    <div
      class="favourite-icon rounded-3 p-2 position-absolute align-self-end text-light"
    >
      <i
        class="fa fa-heart fa-xl fs-2 ${iconClass}"
        onclick="toggleFavouriteIconButton(event,'.card-image img','photos')"
      ></i>
    </div>

    <figure     onclick='showPopUpWindow(event,this,${photosList[i].id},("${photosList[i].src.landscape}"),("${photosList[i].alt}"),("${photosList[i].photographer}"),("${iconClass}"))' class="card-image m-0 shadow-lg border border-1 border-dark">
      <img src="${photosList[i].src.original}" id="${photosList[i].id}" />
    </figure>

    <div
      class="card-user d-flex justify-content-center align-items-center gap-2 py-2"
    >
      <figure class="m-0">
        <img
          src="${photosList[i].src.small}"
          class="user-image rounded-circle"
          style="width: 40px; height: 40px"
        />
      </figure>

      <div class="d-flex flex-column">
        <span class="fs-5">${photosList[i].photographer}</span>
      </div>
    </div>
  </div>`;
  }
  cardsItemsList.innerHTML += cartona;
}

//--------------------------------- display video card -----------------------------//
function displayVideosCards(videosList) {
  let userVideos = currentUser.videos;

  let cartona = "";

  for (let i = 0; i < videosList.length; i++) {
    let cartonaSources = "";

    let result = userVideos.find(({ id }) => id == videosList[i].id);
    let iconClass = "";
    if (result == undefined) {
      iconClass = "fa-regular";
    } else {
      iconClass = "text-danger";
    }

    for (let j = 0; j < videosList[i].video_files.length; j++) {
      cartonaSources += `<source
    src="${videosList[i].video_files[j].link}" type="${videosList[i].video_files[j].file_type}"
  />`;
    }

    cartona += `<div
    class="card cardVideo rounded-1 p-2 bg-grey-dark text-center d-flex justify-content-between align-items-center"
    >
    <div class="favourite-icon rounded-3 p-2 position-absolute align-self-end text-light">
      <i
    class="fa fa-heart fa-xl fs-2 ${iconClass}"
    onclick="toggleFavouriteIconButton(event,'video','videos')"
      ></i>
    </div>
    <div class="shadow-lg border border-1 border-secondary">
      <video onmouseenter='controlVideo(event,"play")' onmouseleave='controlVideo(event,"pause")' class="card-video" style="width: 400px; height: 280px" id = "${videosList[i].id}">
       ${cartonaSources}
        Your browser does not support the video tag.
      </video>
    </div>

    <div class="d-flex">
    <!-- <figure class="m-0">
        <img
          src="${videosList[i].video_pictures[0].picture}"
          class="user-image rounded-circle"
          style="width: 40px; height: 40px"
        />
      </figure> -->
      <span class="fs-5 p-1">${videosList[i].user.name}</span>
    </div>
  </div>`;
  }
  cardsItemsList.innerHTML += cartona;
}

function controlVideo(event, type) {
  if (type == "play") {
    event.target.play();
  } else {
    event.target.pause();
  }
}

//--------------------------------- toggle element favourite -----------------------------//
function toggleFavouriteIconButton(event, selector, type) {
  let icon = event.target;
  icon.classList.toggle("fa-regular");
  icon.classList.toggle("text-danger");

  let element =
    event.target.parentElement.parentElement.querySelector(selector);

  if (!icon.classList.contains("fa-regular")) {
    addFavouritElement(element.id, type);
  } else {
    removeFavouritElement(element.id, type);
  }
}

//--------------------------------- add favourite element -----------------------------//
async function addFavouritElement(elementID, type) {
  let elementObj = await getOneElementFromAPI(type, elementID);

  let checkFound = currentUser[type].filter(({ id }) => id == elementID);

  if (checkFound.length == 0) {
    currentUser[type].push(elementObj);
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  }
}

//--------------------------------- remove favourite element -----------------------------//
function removeFavouritElement(elementID, type) {
  let editedElements = currentUser[type].filter(({ id }) => id != elementID);
  currentUser[type] = [...editedElements];
  sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
}

//--------------------------------- close pop up window -----------------------------//
function closePopUpWindow(event) {
  document.getElementById("image-pop-window").remove();
}

//--------------------------------- show pop up window -----------------------------//
async function showPopUpWindow(
  event,
  self,
  imageID,
  imageSrc,
  imageAlt,
  photographerName
) {
  let cartona = `<section id="image-pop-window" class="vh-100 vw-100 py-5 p-2 overflow-scroll">
  <div
    class="bg-blue-light mt-5 py-1 px-lg-5 rounded-3 d-flex justify-content-center align-items-center container"
  >
    <div
      class="transform d-flex flex-column justify-content-center align-items-center"
    >
      <figure id="photographer-image" class="m-0">
        <img
          class="rounded-circle shadow-lg"
          src="../../images/anonymous-avatar-icon-25.jpg"
          style="width: 100px; height: 100px"
        />
      </figure>
      <div id="photographer-name" class="fs-3 fw-bold p-3">
        <span>${photographerName}</span>
      </div>

      <!-- <div id="photographer-alt" class="lead w-75 pb-4 text-center">
        <span> ${imageAlt} </span>
      </div> -->

      <div class="image-pop d-flex flex-column w-75 h-75 border">
      
        <figure class="m-0 position-relative shadow">
          <img
            class="rounded-2"
            src="${imageSrc}"
            style="width: 100%; height: 100%"
            id = "${imageID}"
          />
        </figure>
      </div>

      <div class="align-self-end mx-3">
        <button
          class="btn btn-outline-dark fs-4 mt-4 mx-3 "
          onclick="closePopUpWindow(event)"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</section>`;

  document.getElementById("pop-up-content").innerHTML = cartona;
}

//--------------------------------- log button -----------------------------//
function onLogOutClick() {
  let usersData = JSON.parse(localStorage.getItem("usersData"));
  usersData.map((user) => {
    if (user.id == currentUser.id) {
      user.photos = currentUser.photos;
      user.videos = currentUser.videos;
    }
  });

  localStorage.setItem("usersData", JSON.stringify(usersData));
  sessionStorage.removeItem("currentUser");
  location.reload();
}

function onLogInClick() {
  location.replace("../log-in/log-in.html");
}

logButton.addEventListener("click", function (event) {
  if (event.target.innerText == "Log In") {
    onLogInClick();
  } else if (event.target.innerText == "Log Out") {
    onLogOutClick();
  }
});

//--------------------------------- up button -----------------------------//
upButton.addEventListener("click", function () {
  document.getElementById("homeContent").scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "center",
  });
});

//--------------------------------- get element -----------------------------//

async function getOneElementFromAPI(type, id) {
  let url = "";
  if (type == "photos") {
    url = `${baseURL}v1/photos/${id}`;
  } else {
    url = `${baseURL}videos/videos/${id}`;
  }

  return await fetch(url, {
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((data) => data);
}

//--------------------------------- scroll controll -----------------------------//
// function disableScroll() {
//   document.body.classList.add("stop-scrolling");
// }

// function enableScroll() {
//   document.body.classList.remove("stop-scrolling");
// }
