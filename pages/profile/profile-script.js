const userName = document.getElementById("user-name");
const photosGrid = document.getElementById("photos-grid");
const videosGrid = document.getElementById("videos-grid");
const logButton = document.getElementById("log-btn");
const photoCount = document.getElementById("photo-counter");
const videoCount = document.getElementById("video-counter");
const upButton = document.getElementById("go-up-button");

// const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

let currentUser = null;

window.addEventListener("load", () => {
  if (sessionStorage.getItem("currentUser") != null) {
    currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    userName.innerText = `${currentUser.name}`;
  }

  photoCount.innerText = currentUser.photos.length;
  videoCount.innerText = currentUser.videos.length;

  setLogButtonText();
  displayPhotosCards();
  displayVideosCards();
});

window.addEventListener("scroll", function () {
  console.log(window.scrollY);
  if (window.scrollY >= window.innerHeight) {
    upButton.children[0].classList.remove("visually-hidden");

    console.log("visible");
  } else {
    upButton.children[0].classList.add("visually-hidden");
  }
});
//--------------------------------- log button -----------------------------//
function setLogButtonText() {
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

    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  } else if (currentUser.id == "000") {
    logButton.innerText = "Log In";
  } else {
    logButton.innerText = "Log Out";
  }
}

//--------------------------------- up button -----------------------------//
upButton.addEventListener("click", function () {
  document.getElementById("profileContent").scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "center",
  });
});

//--------------------------------- display photo card -----------------------------//
function displayPhotosCards() {
  let cartona = "";
  let photosList = currentUser.photos;

  if (photosList.length == 0) {
    cartona =
      '<h3 class="fs-3 p-3"> You Do Not Have Favourite Photos Yet ... </h3>';
  } else {
    for (let i = 0; i < photosList.length; i++) {
      console.log(photosList[i]);
      cartona += `<div
    id="${photosList[i].id}"
    class="card  rounded-1 p-2 bg-grey-dark text-center d-flex justify-content-between align-items-center"
  >
  <div
  class="trash-icon rounded-3 p-2 position-absolute align-self-end"
>
  <i
    class="fa fa-trash text-light fa-lg fs-2"
    onclick="removeFavouritePhoto(event)"
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
  }
  photosGrid.innerHTML += cartona;
}

//--------------------------------- display video card -----------------------------//
function displayVideosCards() {
  let cartona = "";
  let videosList = currentUser.videos;

  if (videosList.length == 0) {
    cartona =
      '<h3 class="fs-3 p-3"> You Do Not Have Favourite Videos Yet ... </h3>';
  } else {
    for (let i = 0; i < videosList.length; i++) {
      let cartonaSources = "";
      for (let j = 0; j < videosList[i].video_files.length; j++) {
        cartonaSources += `<source
    src="${videosList[i].video_files[j].link}" type="${videosList[i].video_files[j].file_type}"
  />`;
      }

      cartona += `<div id="${videosList[i].id}"
    class="card cardVideo rounded-1 p-2 bg-grey-dark text-center d-flex justify-content-between align-items-center"
    >
    <div
  class="trash-icon rounded-3 p-2 position-absolute align-self-end"
>
  <i
    class="fa fa-trash text-light fa-lg fs-2"
    onclick="removeFavouriteVideo(event)"
  ></i>
</div>
    <div class="shadow-lg border border-1 border-secondary">
      <video onmouseenter='controlVideo(event,"play")' onmouseleave='controlVideo(event,"pause")' class="card-video-profile" id = "${videosList[i].id}">
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
  }
  videosGrid.innerHTML = cartona;
}

//--------------------------------- control video -----------------------------//
function controlVideo(event, type) {
  if (type == "play") {
    event.target.play();
  } else {
    event.target.pause();
  }
}

//--------------------------------- navigate to home -----------------------------//
function onHomeNavigate() {
  location.href = "../index/index.html";
}

function removeFavouritePhoto(event) {
  let catchedID = event.target.parentElement.parentElement.id;

  currentUser.photos = currentUser.photos.filter(
    (item) => item.id != catchedID
  );

  sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  event.target.parentElement.parentElement.remove();
}

function removeFavouriteVideo(event) {
  let catchedID = event.target.parentElement.parentElement.id;

  console.log(catchedID);
  currentUser.videos = currentUser.videos.filter(
    (item) => item.id != catchedID
  );

  sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  event.target.parentElement.parentElement.remove();
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

// chack id this element is in current user
