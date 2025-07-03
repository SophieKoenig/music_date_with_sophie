// netlify/functions/fetchDiscogsDetails.js

const fetch = require("node-fetch");

exports.handler = async (event) => {
  const token = process.env.DISCOGS_TOKEN;
  const releaseId = event.queryStringParameters.id;

  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Discogs token not configured." }),
    };
  }
  if (!releaseId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No release ID provided." }),
    };
  }

  const url = `https://api.discogs.com/releases/${releaseId}`;
  const headers = {
    "User-Agent": "sophie.konig/1.0 HTTPClient/1.1",
    Accept: "application/vnd.discogs.v2.discogs+json",
    Authorization: `Discogs token=${token}`,
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
