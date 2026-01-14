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
          <button class="startAudio" type="button">
            ▶
          </button>
          <p>${getArtistName(release)}</p>
        </div>
      </a>
    </li>`;
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

document.addEventListener("click", (event) => {
  console.log("Clicked element:", event.target); // What exactly are we clicking?
  console.log("Closest startAudio:", event.target.closest(".startAudio")); // Should be the button

  const button = event.target.closest(".startAudio");
  if (!button) return;

  console.log("✅ startAudio button found:", button);

  const audio = document.getElementById("trackPlayer");
  event.stopPropagation();
  event.preventDefault();

  audio.removeAttribute("hidden");
  audio
    .play()
    .then(() => {
      console.log("audio playing");
    })
    .catch(console.error);
});

// Content population on load
window.addEventListener("load", () => {
  populateAllSections();
});
