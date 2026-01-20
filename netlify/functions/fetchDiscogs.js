// netlify/functions/fetchDiscogs.js

const fetch = require("node-fetch");

exports.handler = async (event) => {
  const {
    artist = "cluster",
    sort = "title",
    sort_order = "asc",
    per_page = 8,
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
    const url = `https://api.discogs.com/database/search?artist=${artist}&sort=${sort}&sort_order=${sort_order}&per_page=${per_page}`;
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
