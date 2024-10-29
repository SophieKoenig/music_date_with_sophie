import { apiData } from "./discogsAPI.js";

function findQuery(param) {
  //console.log(param);
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function populateNewsPost(post) {
  document.getElementById("postName").innerHTML = post.name;
  document.getElementById("postContent").innerHTML = post.content;
  document.getElementById("postAlbumTitle").innerHTML = post.albumTitle;
}

function populateReleasePost(post) {
  document.getElementById("postName").innerHTML = post.name;
  document.getElementById("postContent").innerHTML = post.content;
  document.getElementById("postAlbumTitle").innerHTML = post.albumTitle;
}

function getNewsPostFromId() {
  var id = JSON.parse(findQuery("id"));
  //console.log("id", findQuery("id"));

  fetch("../data/news.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("newsData", data);
      for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
          populateNewsPost(data[i]);
        }
      }
    });
}

window.addEventListener("load", getNewsPostFromId);

function getReleasePostFromId() {
  var id = JSON.parse(findQuery("id"));
  //console.log("id", findQuery("id"));

  fetch("../data/releases.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("releaseData", data);
      for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
          populateReleasePost(data[i]);
        }
      }
    });
}

window.addEventListener("load", getReleasePostFromId);

function createNewsCard(news) {
  var wrapper = document.getElementById("postLatestNews");
  wrapper.innerHTML += `<li class="news-wrapper__section"><a href="./pages/post.html?id=${news.id}">
    <img src="${news.previewImage}" alt="A random image" />
    <div class="news-wrapper__content">
    <h3>${news.name}</h3>
    <p>${news.shortSummary}</p>
    </div>
    </a>
    </li>`;
}

function getNews(posts) {
  fetch("./data/news.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      posts = data;
      for (let i = 0; i < data.length; i++) {
        createNewsCard(data[i]);
      }
    });
}

window.addEventListener("load", getNews);

function createReviewCards(review) {
  var wrapper = document.getElementById("postsNewReviews");
  wrapper.innerHTML += `<li class="review-wrapper__card"><a href="./pages/post.html?id=${review.id}">
    <img src="${review.previewImage}" alt="A random image" />
    <div class="review-wrapper__content">
    <h4>${review.name}</h4>
    <h3>${review.albumTitle}</h3>
    <p>${review.shortSummary}</p>
    </div>
    </a>
    </li>`;
}

function getReviews(posts) {
  fetch("./data/releases.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      posts = data;
      for (let i = 0; i < 4; i++) {
        createReviewCards(data[i]);
      }
    });
}

window.addEventListener("load", getReviews);

function createReleasesCards(releases) {
  var wrapper = document.getElementById("postsRecentReleases");
  wrapper.innerHTML += `<li class="release-wrapper__card"><a href="./pages/post.html?id=${releases.id}">
    <img src="${releases.previewImage}" alt="A random image" />
    <div class="release-wrapper__content">
    <h4>${releases.name}</h4>
    <h3>${releases.albumTitle}</h3>
    </div>
    </a>
    </li>`;
}

function getReleases(posts) {
  fetch("./data/releases.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      posts = data;
      for (let i = 0; i < data.length; i++) {
        createReleasesCards(data[i]);
      }
    });
}

window.addEventListener("load", getReleases);

const getDataFromApi = apiData();
console.log("apiData", getDataFromApi);
