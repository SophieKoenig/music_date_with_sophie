function populatePost(post) {
  document.getElementById("postTitle").innerHTML = post.title;
  var content = post.content;
  document.getElementById("postContent").innerHTML = content;
}

function findQuery(param) {
  console.log(param);
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function createNewsCard(news) {
  var wrapper = document.getElementById("postLatestNews");
  wrapper.innerHTML += `<li class="news-wrapper__section"><a href="./pages/post.html?id=${news.id}">
    <img src="${news.previewImage}" alt="A random image" />
    <div class="news-wrapper__content">
    <h3>${news.title}</h3>
    <p>${news.shortSummary}</p>
    </div>
    </a>
    </li>`;
}

function getNews() {
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

function createReviewCards(review) {
  var wrapper = document.getElementById("postsNewReviews");
  wrapper.innerHTML += `<li class="review-wrapper__card"><a href="./pages/post.html?id=${review.id}">
    <img src="${review.previewImage}" alt="A random image" />
    <div class="review-wrapper__content">
    <h3>${review.title}</h3>
    <p>${review.shortSummary}</p>
    </div>
    </a>
    </li>`;
}

function getReviews() {
  fetch("./data/reviews.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      posts = data;
      for (let i = 0; i < data.length; i++) {
        createReviewCards(data[i]);
      }
    });
}

function createReleasesCards(releases) {
  var wrapper = document.getElementById("postsRecentReleases");
  wrapper.innerHTML += `<li class="release-wrapper__card"><a href="./pages/post.html?id=${releases.id}">
    <img src="${releases.previewImage}" alt="A random image" />
    <div class="release-wrapper__content">
    <h3>${releases.title}</h3>
    </div>
    </a>
    </li>`;
}

function getReleases() {
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

function getPostFromId() {
  var id = JSON.parse(findQuery("id"));
  console.log("id", findQuery("id"));

  fetch("../data/releases.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
          populatePost(data[i]);
        }
      }
    });
}
