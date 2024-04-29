import React from "react";

export default function SnippetCard({ videoInfo, artistInfo }) {
  const artistBio = artistInfo.artist.bio.summary;
  const artistName = artistInfo.artist.name;
  const youtubeURL = "https://www.youtube.com/watch?v=";

  return (
    <div className="snippet__container">
      <div>{artistName}</div>
      <div className="artistInfo__container"> {artistBio}</div>
      <div className="artistInfo__container"> {artistBio}</div>
    </div>
  );
}
