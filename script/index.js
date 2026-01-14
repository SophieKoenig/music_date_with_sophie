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
          <embed src="play-svgrepo-com.svg" />
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

//window.addEventListener("load", populateAllSections);

// document.addEventListener("click", (event) => {
//   console.log("document click works", event.target);
//   const button = event.target.closest(".startAudio");
//   if (!button) return;

//   console.log("startAudio clicked");

//   const audi = document.getElementById("trackPlayer");
//   event.preventDefault();
//   event.stopPropagation();

//   audio.removeAttribute("hidden");
//   audio
//     .play()
//     .then(() => {
//       console.log("audio playing");
//     })
//     .catch(console.error);
// });

document.addEventListener("click", (event) => {
  console.log("document click works", event.target);

  // Look for button OR its parent link containing the button
  const button =
    event.target.closest(".startAudio") ||
    event.target.closest("a").querySelector(".startAudio");

  if (!button) return;

  console.log("startAudio clicked");

  const audio = document.getElementById("trackPlayer");
  event.preventDefault();
  event.stopPropagation();

  audio.removeAttribute("hidden");
  audio
    .play()
    .then(() => {
      console.log("audio playing");
    })
    .catch(console.error);
});

// //make audio controls visible + playing audio
// window.addEventListener("load", () => {
//   console.log("window load fired");

//   populateAllSections();

//   const audio = document.getElementById("trackPlayer");
//   console.log("audio element:", audio);

//   document.addEventListener("click", (event) => {
//     console.log("any click on document", event.target);
//     const button = event.target.closest(".startAudio");

//     if (!button) return;

//     console.log("startAudio clicked");

//     // show controls
//     event.preventDefault();
//     event.stopPropagation();

//     audio.removeAttribute("hidden");

//     // step 2: start playback
//     audio
//       .play()
//       .then(() => {
//         console.log("audio is playing");
//       })
//       .catch((err) => {
//         console.error("Could not start audio:", err);
//       });
//   });
// });

window.addEventListener("load", () => {
  console.log("window load fired");
  populateAllSections();
});
