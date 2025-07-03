import { DISCOGS_TOKEN } from "../config.js";

// Fetch recent releases (example: by genre, label, or general search)
function fetchRecentReleases() {
  const url = "../netlify/functions/fetchDiscogs";
  const headers = {
    "User-Agent": "sophie.konig/1.0 HTTPClient/1.1",
    Accept: "application/vnd.discogs.v2.discogs+json",
    Authorization: `Discogs token=${DISCOGS_TOKEN}`,
  };

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error("Discogs fetch error:", error);
      return [];
    });
}

// Fetch detailed information for a specific release
function fetchReleaseDetails(releaseId) {
  const url = `../netlify/functions/fetchDiscogsDetails?id=${releaseId}`;
  const headers = {
    "User-Agent": "sophie.konig/1.0 HTTPClient/1.1",
    Accept: "application/vnd.discogs.v2.discogs+json",
    Authorization: `Discogs token=${DISCOGS_TOKEN}`,
  };

  return fetch(url)
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching release details:", error);
      return null;
    });
}

export { fetchRecentReleases, fetchReleaseDetails };
