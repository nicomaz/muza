import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSimilarArtists } from "../utils/api";
import { motion } from "framer-motion";
import createData from "../utils/createData";
import GraphResult from "../components/GraphResult";
import { ThemeContext } from "../contexts/Theme";

export default function ArtistResultPage() {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState();
  const location = useLocation();
  const { input } = location.state;

  useEffect(() => {
    getSimilarArtists(input.artist)
      .then((artists) => {
        return artists;
      })
      .then((artists) => {
        setData(createData(input.artist, artists));
      });
    console.log(data);
  }, []);

  return (
    <motion.div
      className="background"
      initial={{ opacity: 1, backgroundColor: "#f6b6c6" }}
      animate={{ backgroundColor: theme === "songs" ? "#f6b6c6" : "#6ac3f3" }}
    >
      {data ? <GraphResult data={data} /> : null}
    </motion.div>
  );
}
