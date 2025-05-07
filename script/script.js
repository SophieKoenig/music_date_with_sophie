import { fetchRecentReleases } from "./discogsAPI.js";

// Helper to create a card from Discogs release data
function createReleaseCard(release, wrapperId) {
  const wrapper = document.getElementById(wrapperId);
  wrapper.innerHTML += `
    <li class="release-wrapper__card">
      <a href="${release.resource_url}" target="_blank">
        <img src="${
          release.cover_image || "https://via.placeholder.com/150"
        }" alt="${release.title}" />
        <div class="release-wrapper__content">
          <h4>${release.title}</h4>
          <h3>${release.year || ""}</h3>
          <p>${release.artist || release.artist_name || ""}</p>
        </div>
      </a>
    </li>
  `;
}

// Populate all sections with Discogs data
function populateAllSections() {
  fetchRecentReleases().then((releases) => {
    // News section (first 2)
    document.getElementById("postLatestNews").innerHTML = "";
    releases.slice(0, 2).forEach((r) => createReleaseCard(r, "postLatestNews"));

    // Reviews section (next 4)
    document.getElementById("postsNewReviews").innerHTML = "";
    releases
      .slice(2, 6)
      .forEach((r) => createReleaseCard(r, "postsNewReviews"));

    // Recent Releases section (last 4)
    document.getElementById("postsRecentReleases").innerHTML = "";
    releases
      .slice(4, 8)
      .forEach((r) => createReleaseCard(r, "postsRecentReleases"));
  });
}

window.addEventListener("load", populateAllSections);
