import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSimilarArtists } from "../utils/api";
import { motion } from "framer-motion";
import createData from "../utils/createData";
import GraphResult from "../components/GraphResult";
import { ThemeContext } from "../contexts/Theme";

export default function ArtistResultPage() {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState();
  let { artistId } = useParams();

  useEffect(() => {
    getSimilarArtists(artistId)
      .then((artists) => {
        return artists;
      })
      .then((artists) => {
        setData(createData(artistId, artists));
      });
  }, []);

  return (
    <motion.div
      className="background"
      initial={{ opacity: 1, backgroundColor: "#f6b6c6" }}
      animate={{ backgroundColor: theme === "songs" ? "#f6b6c6" : "#6ac3f3" }}
    >
      <GraphResult data={data} />
    </motion.div>
  );
}
