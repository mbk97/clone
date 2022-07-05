//profile nav

const names = document.querySelector(".name");
const userImage = document.querySelector(".user_profile_img");
const username = document.querySelector(".username");
const followers = document.querySelector(".followers_num");
const following = document.querySelector(".following_num");
const company = document.querySelector(".company_text");
const locationText = document.querySelector(".location_text");
const email = document.querySelector(".email_text");
const website = document.querySelector(".website_text");
const twitter = document.querySelector(".twitter_text");
const mailBlock = document.querySelector(".email_block");
const websiteBlock = document.querySelector(".website_block");
const twitterBlock = document.querySelector(".twitter_block");
const companyBlock = document.querySelector(".company_block");
const locationBlock = document.querySelector(".location_block");
const mobileAvatar = document.querySelector(".mobile_avatar");
const mobileUsername = document.querySelector(".username_mobile");
const smallUserImg = document.querySelector(".user_img");
const absoluteImg = document.querySelector(".absolute_avatar");
const absoluteUsername = document.querySelector(".absolute_username");
const absoluteWrapper = document.querySelector(".username_wrapper_absolute");
let user = "";
//tabs
const tabWrapper = document.querySelector(".tabLinks_container");
const tabContent = document.querySelectorAll(".tab_content");
const tabLinks = document.querySelectorAll(".tablinks");
const active = document.querySelector(".active");
const notification = document.querySelector(".notification_dot");

//overviewCards
const overviewCardWrapper = document.querySelector(".overview_card_wrapper");

//repo section
const counter = document.querySelector(".counter");
const repoFlex = document.querySelector(".repo_wrapper");

const scrollPosition = window.scrollY;

const profileHtml = () => {
  const data = JSON.parse(window.localStorage.getItem("userProfile"));
  console.log(data);
  names.innerHTML = data.name;
  userImage.src = data.avatar_url;
  mobileAvatar.src = data.avatar_url;
  smallUserImg.src = data.avatar_url;
  absoluteImg.src = data.avatar_url;
  absoluteUsername.innerHTML = data.login;
  username.innerHTML = data.login;
  mobileUsername.innerHTML = data.login;
  followers.innerHTML = data.followers;
  following.innerHTML = data.following;
  user = data.login;

  if (data.company === null) {
    companyBlock.style.display = "none";
  } else {
    company.innerHTML = data.company;
  }
  if (data.email === null) {
    mailBlock.style.display = "none";
  } else {
    email.innerHTML = data.email;
  }
  if (data.blog === null) {
    websiteBlock.style.display = "none";
  } else {
    website.innerHTML = data.blog;
  }
  if (data.twitter_username === null) {
    twitterBlock.style.display = "none";
  } else {
    twitter.innerHTML = data.twitter_username;
  }
  if (data.location === null) {
    locationBlock.style.display = "none";
  } else {
    locationText.innerHTML = data.location;
  }
};

profileHtml();

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    tabWrapper.classList.add("active_scroll");
  } else {
    tabWrapper.classList.remove("active_scroll");
  }
});
window.addEventListener("scroll", () => {
  if (window.scrollY > 380) {
    tabWrapper.classList.add("active_scroll_two");
  } else {
    tabWrapper.classList.remove("active_scroll_two");
  }
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 420) {
    absoluteWrapper.classList.add("active");
  } else {
    absoluteWrapper.classList.remove("active");
  }
});

// tabs
const openTab = (evt, tabName) => {
  for (var i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  for (var i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace("active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.target.classList.add("active");
};

//overview Repositories
const fetchOverviewRepo = async () => {
  // console.log(user);
  const overviewUrl = `https://api.github.com/users/${user}/repos`;
  try {
    const response = await fetch(overviewUrl);
    const data = await response.json();
    const results = data.slice(0, 4);
    const repoResults = data.slice(0, 20);
    counter.innerHTML = repoResults.length;
    repositoryData(repoResults);
    overviewCardsHtml(results);
  } catch (error) {
    console.log(error);
  }
};

fetchOverviewRepo();

const overviewCardsHtml = (results) => {
  let card = "";
  results.map((result) => {
    card += `
    <div class="overview_card">
              <div class="title">
                <p class="project_title">${result.name}</p>
                <p class="project_status">${result.visibility}</p>
              </div>
              <p class="project_details">${result.full_name}</p>
              <p class="language">${
                result.language === null ? "" : result.language
              }</p>
            </div>
    `;
  });
  overviewCardWrapper.innerHTML = card;
};

const repositoryData = (repoResults) => {
  let repoCard = "";

  repoResults.map((result) => {
    repoCard += `
   <div class="repo_flex">
                   <div class="content_one">
                    <div class="one">
                      <p class="project_title">${result.name}</p>
                      <p class="project_status pro_status">${
                        result.visibility
                      }</p>
                    </div>
                     <div class="date_lang">
                       <p class="language_repo">${
                         result.language === null ? "" : result.language
                       }</p>
                        <p class="date">Updated on <span class="date_text">${new Date(
                          result.updated_at
                        ).toLocaleDateString("en-us", {
                          year: "numeric",
                          date: "numeric",
                          month: "short",
                        })}</span> </p>
                     </div>
                   </div>
                   <div class="content_two">
                    <button class="star_btn">
                    <i class="bi star_repo_icon bi-star"></i>
                     Star
                    </button>
                    <button class="arrow_btn">
                      <i class="fa-solid arrow_repo_icon fa-caret-down"></i>
                    </button>
                   </div>
              </div>
    `;
  });
  repoFlex.innerHTML = repoCard;
};
