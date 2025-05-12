import { fetchRecentReleases } from "./discogsAPI.js";

// Helper to extract artist names from Discogs search result
function getArtistName(release) {
  if (release.artist) return release.artist;
  if (release.artist_name) return release.artist_name;
  if (Array.isArray(release.artists) && release.artists.length > 0) {
    return release.artists.map((a) => a.name).join(", ");
  }
  return "";
}

// Helper to create a card from Discogs release data
function createReleaseCard(release, wrapperId) {
  const wrapper = document.getElementById(wrapperId);
  // Link to the details page with the release ID
  wrapper.innerHTML += `
    <li class="release-wrapper__card">
      <a href="pages/post.html?id=${release.id}">
        <img src="${
          release.cover_image || "https://via.placeholder.com/150"
        }" alt="${release.title}" />
        <div class="release-wrapper__content">
          <h4>${release.title}</h4>
          <h3>${release.year || ""}</h3>
          <p>${getArtistName(release)}</p>
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
      .slice(6, 10)
      .forEach((r) => createReleaseCard(r, "postsRecentReleases"));
  });
}

window.addEventListener("load", populateAllSections);
