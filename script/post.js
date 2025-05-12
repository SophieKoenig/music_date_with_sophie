import { fetchReleaseDetails } from "./discogsAPI.js";

const urlParams = new URLSearchParams(window.location.search);
const releaseId = urlParams.get("id");

const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const contentEl = document.getElementById("releaseContent");

if (releaseId) {
  fetchReleaseDetails(releaseId)
    .then((data) => {
      if (data) {
        populateReleaseData(data);
        contentEl.style.display = "block";
        loadingEl.style.display = "none";
      } else {
        showError();
      }
    })
    .catch(() => showError());
} else {
  showError("No release ID specified");
}

function populateReleaseData(release) {
  document.getElementById("releaseTitle").textContent = release.title;
  document.getElementById("releaseArtist").textContent =
    release.artists?.map((a) => a.name).join(", ") || "Unknown artist";
  document.getElementById("releaseYear").textContent =
    release.year || "Unknown year";
  document.getElementById("releaseGenre").textContent =
    release.genres?.join(", ") || "Unknown genre";
  document.getElementById("releaseLabel").textContent =
    release.labels?.[0]?.name || "Unknown label";
  document.getElementById("releaseCountry").textContent =
    release.country || "Unknown";
  document.getElementById("releaseFormat").textContent =
    release.formats
      ?.map((f) => `${f.name}${f.qty > 1 ? ` (${f.qty}x)` : ""}`)
      .join(", ") || "Unknown";

  const coverImg = document.getElementById("releaseCover");
  coverImg.src =
    release.images?.[0]?.uri ||
    "https://via.placeholder.com/400x400?text=No+Image";

  const tracklistEl = document.getElementById("tracklist");
  if (release.tracklist?.length > 0) {
    tracklistEl.innerHTML = release.tracklist
      .map(
        (track) =>
          `<li>${track.position} - ${track.title} ${
            track.duration ? `(${track.duration})` : ""
          }</li>`
      )
      .join("");
  } else {
    tracklistEl.innerHTML = "<li>No tracklist available</li>";
  }

  const discogsLink = document.getElementById("discogsLink");
  if (release.uri) {
    discogsLink.href = release.uri;
  } else {
    discogsLink.style.display = "none";
  }

  // Collaborators
  const collaboratorsList = document.getElementById("collaboratorsList");
  if (release.extraartists?.length > 0) {
    const rolesToShow = ["Producer", "Mixed By", "Mastered By", "Engineer"];
    const filtered = release.extraartists.filter((artist) =>
      rolesToShow.some((role) => artist.role && artist.role.includes(role))
    );
    if (filtered.length > 0) {
      collaboratorsList.innerHTML = filtered
        .map(
          (artist) => `
          <li class="collaborator">
            <a href="https://www.discogs.com/artist/${artist.id}" target="_blank" class="collaborator-link">
              <span class="collaborator-name">${artist.name}</span>
              <span class="collaborator-role">${artist.role}</span>
            </a>
          </li>
        `
        )
        .join("");
    } else {
      collaboratorsList.innerHTML = "<li>No key collaborators found.</li>";
    }
  } else {
    collaboratorsList.innerHTML = "<li>No collaborator data available</li>";
  }
}

function showError(message) {
  loadingEl.style.display = "none";
  errorEl.style.display = "block";
  if (message) errorEl.textContent = message;
}
