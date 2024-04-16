const BASE_URL = "http://ws.audioscrobbler.com/2.0?method=";
const apiKey = import.meta.env.VITE_API_KEY;

const headers = {
  "user-agent": "muza/1.0",
  "content-type": "application/json",
};

async function getArtist(artistName) {
  try {
    const response = await fetch(
      `${BASE_URL}artist.search&artist=${artistName}&api_key=${apiKey}&limit=5&format=json`,
      headers
    );

    if (!response.ok) {
      throw new Error("Artist does not exist");
    }

    const data = await response.json();
    console.log(data.results.artistmatches.artist);
    return data.results.artistmatches.artist;
  } catch (error) {
    console.error(error);
  }
}

export default getArtist;
