// navigation
const navBtn = document.querySelector(".nav_toggle");
const menu = document.querySelector(".profile_nav");
const profileNav = document.querySelector(".layout_grid");

// navigation

// user profile document
const searchField = document.getElementById("search_input");
const searchBtn = document.querySelector("#btn");
const ErrBlock = document.querySelector(".error_wrapper");
// user profile document

// shows nav on small screen
// navBtn.addEventListener("click", () => {
//   menu.classList.add("active");
//   if (menu.style.display === "none") {
//     menu.style.display = "block";
//   } else {
//     menu.style.display = "none";
//   }
// });

//fetch user profile data
let query = "";
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  query = searchField.value.trim();
  if (searchField.value === "") {
    alert("Input field cannot be empty");
  } else {
    fetchUser();
  }
});

const fetchUser = async () => {
  const baseUrl = `https://api.github.com/users/${query}`;

  try {
    const response = await fetch(baseUrl);
    console.log(response);
    const data = await response.json();
    window.localStorage.setItem("userProfile", JSON.stringify(data));
    if (response.ok === true) {
      window.location.href = "profile.html";
    }
    if (response.ok === false) {
      ErrBlock.style.display = "block";
      ErrBlock.innerHTML = "user not found!!!";
    }
  } catch (error) {
    if (error) {
      ErrBlock.style.display = "block";
      ErrBlock.innerHTML = error.message;
    }
  }
};
