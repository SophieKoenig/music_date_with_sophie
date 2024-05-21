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

function createPreviewCard(card) {
  var wrapper = document.getElementById("postsSummaries");
  wrapper.innerHTML += `<li class="card-wrapper__card"><a href="./pages/post.html?id=${card.id}">
    <img src="${card.previewImage}" alt="A random image" />
    <div class="card-wrapper__content">
    <h3>${card.title}</h3>
    <p>${card.shortSummary}</p>
    </div>
    </a>
    </li>`;
}

function getPosts() {
  fetch("./data/posts.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      posts = data;
      for (let i = 0; i < data.length; i++) {
        createPreviewCard(data[i]);
      }
    });
}

function getPostFromId() {
  var id = JSON.parse(findQuery("id"));
  console.log("id", findQuery("id"));

  fetch("../data/posts.json")
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

function createNewsCard(news) {
  var wrapper = document.getElementById("postsLatestNews");
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
