// netlify/functions/fetchDiscogs.js

const fetch = require("node-fetch"); // or use axios if you prefer

exports.handler = async (event) => {
  // Get query parameters (optional, for flexibility)
  const {
    type = "release",
    sort = "year",
    sort_order = "desc",
    per_page = 8,
    genre = "rock",
  } = event.queryStringParameters || {};
  const token = process.env.DISCOGS_TOKEN;

  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Discogs token not configured." }),
    };
  }

  const headers = {
    "User-Agent": "sophie.konig/1.0 HTTPClient/1.1",
    Accept: "application/vnd.discogs.v2.discogs+json",
    Authorization: `Discogs token=${token}`,
  };

  try {
    // Example: fetch recent releases
    const url = `https://api.discogs.com/database/search?type=${type}&sort=${sort}&sort_order=${sort_order}&per_page=${per_page}&genre=${genre}`;
    const response = await fetch(url, { headers });
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.results),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
