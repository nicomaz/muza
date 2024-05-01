import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSimilarArtists } from "../utils/api";

export default function ArtistResultPage() {
  const location = useLocation();
  const { input } = location.state;

  useEffect(() => {
    getSimilarArtists(input.artist).then((artists) => {
      console.log(artists);
    });
  }, []);
  return <div>ArtistResultPage</div>;
}
