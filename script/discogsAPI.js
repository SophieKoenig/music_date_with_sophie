import { DISCOGS_TOKEN } from "../config.js";

// Fetch recent releases (example: by genre, label, or general search)
function fetchRecentReleases() {
  const url =
    "https://api.discogs.com/database/search?type=release&sort=year&sort_order=desc&per_page=8&genre=rock";
  const headers = {
    "User-Agent": "sophie.konig/1.0 HTTPClient/1.1",
    Accept: "application/vnd.discogs.v2.discogs+json",
    Authorization: `Discogs token=${DISCOGS_TOKEN}`, // If you have a token
  };

  return fetch(url, { headers })
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => {
      console.error("Discogs fetch error:", error);
      return [];
    });
}

export { fetchRecentReleases };
