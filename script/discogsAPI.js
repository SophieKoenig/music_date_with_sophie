// discogsAPI.js

// Fetch recent releases from your Netlify function
function fetchRecentReleases() {
  return fetch("../.netlify/functions/fetchDiscogs")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Discogs fetch error:", error);
      return [];
    });
}

// Fetch detailed information for a specific release (if you have a function for this)
function fetchReleaseDetails(releaseId) {
  return fetch(`../.netlify/functions/fetchDiscogsDetails?id=${releaseId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching release details:", error);
      return null;
    });
}

export { fetchRecentReleases, fetchReleaseDetails };
