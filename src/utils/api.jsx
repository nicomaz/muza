const BASE_URL = "http://ws.audioscrobbler.com/2.0?method=";
const apiKey = import.meta.env.VITE_API_KEY;
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/";

const headers = {
  "user-agent": "muza/1.0",
  "content-type": "application/json",
};

export async function getArtist(artistName) {
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

export async function getSimilarArtists(artistName) {
  try {
    const response = await fetch(
      `${BASE_URL}artist.getsimilar&artist=${artistName}&api_key=${apiKey}&limit=50&format=json`,
      headers
    );

    if (!response.ok) {
      throw new Error("Artist does not exist");
    }

    const data = await response.json();
    return data.similarartists.artist;
  } catch (error) {
    console.error(error);
  }
}

export async function getArtistVideos(artistName) {
  try {
    const response = await fetch(
      `${YOUTUBE_BASE_URL}search?key=${YOUTUBE_API_KEY}&type=video&part=snippet&q=${artistName}&maxResults=1&order=viewCount&videoCategoryId=10&videoEmbeddable=true`
    );

    if (!response.ok) {
      throw new Error("Canot find any music videos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getArtistInfo(artistName) {
  try {
    const response = await fetch(
      `${BASE_URL}artist.getinfo&artist=${artistName}&api_key=${apiKey}&format=json`,
      headers
    );

    if (!response.ok) {
      throw new Error("Artist does not exist");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
