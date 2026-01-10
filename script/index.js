import { fetchRecentReleases } from "./discogsAPI.js";

const PLACEHOLDER_IMG = "../missingTrack2.jpg";

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
  // Use placeholder if cover_image is missing, empty, or null
  const imgSrc =
    release.cover_image && release.cover_image.trim() !== ""
      ? release.cover_image
      : PLACEHOLDER_IMG;
  wrapper.innerHTML += `
    <li class="release-wrapper__card">
      <a href="pages/post.html?id=${release.id}">
        <img src="${imgSrc}" alt="${release.title}" />
        <div class="release-wrapper__content">
          <h4>${release.title}</h4>
          <h3>${release.year || ""}</h3>
          <button>
          <embed src="play-svgrepo-com.svg" />
          </button>
          <p>${getArtistName(release)}</p>
        </div>
      </a>
    </li>
  <audio src="somethingsGotAHoldOfMyHeart.wav"></audio>`;
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
