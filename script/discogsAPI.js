// Define the URL of the resource you want to fetch
const url = 'https://api.discogs.com/releases/249504';

// Define the headers, including the User-Agent
const headers = {
    'User-Agent': 'soffanDiscogsClient/1.0 HTTPClient/1.1',
    'Accept': 'application/vnd.discogs.v2.discogs+json'
};

// Use the fetch API to make a GET request to the Discogs API
fetch(url, { headers })
    .then(response => {
        // Check if the response is ok (status 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Parse the JSON from the response
        return response.json();
    })
    .then(data => {
        // Log the data to the console (or process it as needed)
        console.log(data);
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with the fetch operation:', error);
    });
