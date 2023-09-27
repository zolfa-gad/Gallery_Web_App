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
const profileLogo = document.getElementById("profileLogo");

// let photosEndPoint = "v1/curated";
// let videosEndPoint = "videos/popular";

let categoryType = "photos";
let defaultSearch = "sky";
let pageCounter = 1;

let currentUser = null;

window.addEventListener("load", () => {
  // cardsItemsList.innerHTML = "";
  // getDataFromAPI(defaultSearch, "photos");

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
profileLogo.addEventListener("click", () => {
  location.href = "../profile/profile.html";
});

//---------------------------------- window event ------------------------------//

window.addEventListener("scroll", function () {
  console.log(this.window.innerHeight, "h");
  console.log(window.scrollY, "y");
  console.log(pageCounter, "counter");
  console.log(window.outerHeight * pageCounter);
  if (window.scrollY >= window.outerHeight * pageCounter) {
    cardsItemsList.innerHTML = "";
    getDataFromAPI(defaultSearch, categoryType);
    console.log("matched");
  }

  // const divStop = this.document.getElementById("stop-div");
  // const scroller = new IntersectionObserver((entries) => {
  //   // console.log(entries, "entries");
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       console.log(entry, "entry");
  //       console.log("isIntersecting");

  //       getDataFromAPI(defaultSearch, categoryType);

  //       // divStop.scrollIntoView({ block: "end", behavior: "smooth" });
  //       scroller.unobserve(divStop);
  //     }
  //   });
  // });

  // scroller.observe(divStop);

  // scroller.observe(scrollBox);

  // if (window.scrollY >= 550) {
  //   navScrollBar.classList.remove("visually-hidden");
  //   // navScrollBar.style.visibility = "visible";
  // } else {
  //   navScrollBar.classList.add("visually-hidden");
  //   // navScrollBar.style.visibility = "hidden";
  // }
  // console.log(window.scrollY, "y");
  // console.log(pageCounter, "counter");

  // 2150
  // if (window.scrollY >= 2150 * (pageCounter - 1)) {
  // getDataFromAPI(defaultSearch, categoryType);

  // if (categoryType == "photos") {
  //   getDataFromAPI(defaultSearch, categoryType);
  // } else {
  //   getDataFromAPI(defaultSearch, categoryType);
  // }
  // }
});

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

  // change nav bar button size
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

  console.log(url, "url");

  await fetch(url, {
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);

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

  if (self.innerText != "Home") {
    if (self.innerText.toLowerCase() != categoryType) {
      onHomeTabClick(self);
    } else {
      homeTabList.scrollIntoView(true, {
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
  } else {
    document.getElementById("bodyTop").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  }

  // window.scrollTo(0, 600);

  // pageCounter = 1;
  // cardsItemsList.innerHTML = "";

  // if (self.innerText != "Home") {
  //   getDataFromAPI(defaultSearch, self.innerText.toLowerCase());
  // }

  // for (const item of navTabItems) {
  //   console.log(item);
  //   item.classList.remove("bg-grey-dark");
  // }

  // self.classList.add("bg-grey-dark");
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

  // for (const item of homeTabItems) {
  //   console.log(item);
  //   item.classList.remove("bg-grey-light");
  // }

  // self.classList.add("bg-grey-light");

  pageCounter = 1;
  cardsItemsList.innerHTML = "";
  // window.scrollTo(0, 600);

  // document.getElementById("bodyTop").scrollIntoView({
  //   behavior: "smooth",
  //   block: "start",
  //   inline: "center",
  // });

  getDataFromAPI(defaultSearch, self.innerText.toLowerCase());

  // if (self.innerText.toLowerCase() == "videos") {
  //   getDataFromAPI(defaultSearch, self.innerText.toLowerCase());
  // } else {
  //   getDataFromAPI(defaultSearch, self.innerText.toLowerCase());
  // }
  categoryType = self.innerText.toLowerCase();
}

//--------------------------------- on seacrh home click ----------------------------//

function onSearchClick(type) {
  pageCounter = 1;
  cardsItemsList.innerHTML = "";
  console.log(categoryType, "type");
  console.log(homeSearchInput.value);
  console.log(navSearchInput.value);

  // homeTabList.classList.add('d-none')
  // homeTabList.style.visibility = "hidden";
  // console.log(homeTabList, "homelist");

  // homeGrid.scrollIntoView(true);
  // console.log(homeGrid, "homegrid");
  // setTimeout(() => {
  //   homeTabList.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //     inline: "center",
  //   });
  // }, 1000);
  if (type == "nav") {
    console.log(navSearchInput.value);
    getDataFromAPI(navSearchInput.value, categoryType);
    defaultSearch = navSearchInput.value;
  } else {
    getDataFromAPI(homeSearchInput.value, categoryType);
    defaultSearch = homeSearchInput.value;
  }
}

// document
//   .getElementById("categorySelect")
//   .addEventListener("change", function (event) {
//     console.log(event.target.value, "event");
//     categoryType = event.target.value;
//   });

//--------------------------------- select change -----------------------------//

function onSelectChange(event) {
  categoryType = event.target.value;
  // if()
  // getDataFromAPI(navSearchInput.value, "videos");
  // defaultSearch = navSearchInput.value;
}

//--------------------------------- display photo card -----------------------------//

function displayPhotosCards(photosList) {
  let userPhotos = currentUser.photos;
  let cartona = "";
  //"${photosList[i].src.landscape}")
  for (let i = 0; i < photosList.length; i++) {
    let result = userPhotos.find(({ id }) => id == photosList[i].id);
    let iconClass = "";
    if (result == undefined) {
      iconClass = "fa-regular";
      // icon.classList.toggle("fa-regular");
      // icon.classList.toggle("text-danger");
    } else {
      iconClass = "text-danger";
    }
    cartona += `<div
    onclick='showPopUpWindow(event,this,("${photosList[i].src.landscape}"),("${photosList[i].alt}"),("${photosList[i].photographer}"))'
    class="card  rounded-1 p-2 bg-grey-dark text-center d-flex justify-content-between align-items-center"
  >
    <div class="favourite-icon rounded-3 p-2 position-absolute align-self-end">
      <i
        class="fa fa-heart fa-xl fs-2 ${iconClass}"
        onclick="toggleFavouriteIconButton(event,'.card-image img','photos')"
      ></i>
    </div>

    <figure class="card-image m-0 shadow-lg border border-1 border-dark">
      <img src="${photosList[i].src.original}"
   
      id = "${photosList[i].id}" />
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
        <span class="fs-5 ">${photosList[i].photographer}</span>
      </div>
    </div>
  </div>`;
  }
  cardsItemsList.innerHTML += cartona;
}

//--------------------------------- display video card -----------------------------//

function displayVideosCards(videosList) {
  let userVideos = currentUser.videos;
  console.log(userVideos, "videos");

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

    console.log(result, "result");

    for (let j = 0; j < videosList[i].video_files.length; j++) {
      cartonaSources += `<source
    src="${videosList[i].video_files[j].link}" type="${videosList[i].video_files[j].file_type}"
  />`;
    }

    // console.log(cartonaSources, "source");

    cartona += `<div onclick="printInfo(this,event)"
    class="card cardVideo rounded-1 p-2 bg-grey-dark text-center d-flex justify-content-between align-items-center"
    >
    <div class="favourite-icon rounded-3 p-2 position-absolute align-self-end">
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

//--------------------------------- get element -----------------------------//

async function getOneElementFromAPI(type, id) {
  let url = "";
  if (type == "photos") {
    url = `${baseURL}v1/photos/${id}`;
  } else {
    url = `${baseURL}videos/videos/${id}`;
  }

  console.log(url, "url");

  return await fetch(url, {
    headers: {
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((data) => data);
}

//--------------------------------- toggle element favourite -----------------------------//

function toggleFavouriteIconButton(event, selector, type) {
  let icon = event.target;
  icon.classList.toggle("fa-regular");
  icon.classList.toggle("text-danger");

  let element =
    event.target.parentElement.parentElement.querySelector(selector);
  console.log(element);

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

//--------------------------------- print info -----------------------------//

function printInfo(self, event) {
  console.log(self);
  console.log(event);
  console.log(event.target);
}
//--------------------------------- test -----------------------------//
//--------------------------------- test -----------------------------//

// document
//   .getElementsByClassName("card-video")
//   .addEventListener("mouseleave", function (event) {
//     console.log(event);
//   });

function closePopUpWindow(event) {
  console.log(event.target.parentElement.parentElement, "close");
  // document.getElementById("image-pop-window").classList.add("visually-hidden");
  document.getElementById("image-pop-window").remove();
  enableScroll();
}

async function showPopUpWindow(
  event,
  self,
  imageSrc,
  imageAlt,
  photographerName
) {
  // console.log(args, "args");
  // console.log(imageSrc);
  console.log(self, "self");
  console.log(event.target.parentElement.querySelector("img").id);
  disableScroll();
  // let elementID = event.target.parentElement.querySelector("img").id;
  // let image = await getOneElementFromAPI("photos", elementID);
  // console.log(image, "x");

  // let div = event.target.parentElement.parentElement.parentElement;
  let cartona = `        <div id="image-pop-window" class="w-75 h-75 d-flex justify-content-center align-items-center mt-3">
  <section  >
    <div class="bg-blue-dark px-lg-5 ounded-3 ">
      <div
        class="transform d-flex flex-column justify-content-center align-items-center p-2"
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

        <div id="photographer-alt" class="lead w-75 pb-4 text-center">
          <span>
          ${imageAlt}
          </span>
        </div>

        <div class="image-pop d-flex flex-column col-11">
          <span
            class="favourite-icon position-absolute p-3 align-self-end"
            onclick="toggleFavouriteIconButton(event, 'img', 'photos')"
          >
            <i class="fa fa-heart fa-regular fs-1"></i>
          </span>
          <figure class="m-0 position-relative">
            <img
              class="rounded-2"
              src="${imageSrc}"
              style="width: 100%; height: 100%"
            />
          </figure>
        </div>

        <div class="align-self-end">
          <button
            class="btn btn-outline-light fs-4 mt-4 mx-3 px-3"
            onclick="closePopUpWindow(event)"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </section>
</div>`;
  document.getElementById("pop-up-content").innerHTML = cartona;
  console.log(self.parentElement, "kldzcfkzx");
  // self.parentElement.innerHTML += cartona;
  // document
  //   .getElementById("image-pop-window")
  //   .classList.remove("visually-hidden");
}

//--------------------------------- scroll controll -----------------------------//

function disableScroll() {
  document.body.classList.add("stop-scrolling");
}

function enableScroll() {
  document.body.classList.remove("stop-scrolling");
}

//--------------------------------- log button -----------------------------//

function onLogOutClick() {
  let usersData = JSON.parse(localStorage.getItem("usersData"));
  console.log(usersData);
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
  console.log(event.target.innerText);
  if (event.target.innerText == "Log In") {
    onLogInClick();
  } else if (event.target.innerText == "Log Out") {
    onLogOutClick();
  }
});
