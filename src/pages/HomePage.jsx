import { ThemeContext } from "../contexts/Theme";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import VinylSleeve from "../components/VinylSleeve";
import Vinyl from "../components/Vinyl";
import CheckInputContainer from "../components/CheckInputContainer";
import { getArtist } from "../utils/api";
import ErrorModal from "../components/ErrorModal";

export default function HomePage() {
  const { theme } = useContext(ThemeContext);
  const [degree, setDegree] = useState(0);
  const [x1, setX] = useState(0);
  const [y1, setY] = useState(0);
  const [height, setHeight] = useState(0);
  const vinySleeveRef = useRef();
  const [width, setWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const [artists, setArtists] = useState([]);
  const [input, setInput] = useState({
    artist: "",
    song: "",
  });
  const [searchOpen, setSearchOpen] = useState(true);
  const [realArtist, setRealArtist] = useState(true);

  const navigate = useNavigate();

  // check if window size has changed to update vinyl size
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setX(vinySleeveRef.current.getBoundingClientRect().x);
    setY(vinySleeveRef.current.getBoundingClientRect().top);
    setHeight(vinySleeveRef.current.getBoundingClientRect().width);
  }, [width, windowHeight]);

  const searchForArtist = () => {
    setSearchOpen(true);
    getArtist(input.artist).then((artists) => {
      setArtists(artists);
      artists.length > 0
        ? navigate(`/similar-artists/${input.artist}`)
        : setRealArtist(false);
    });
  };

  return (
    <motion.div
      className="background"
      initial={{ opacity: 1, backgroundColor: "#f6b6c6" }}
      animate={{ backgroundColor: theme === "songs" ? "#f6b6c6" : "#6ac3f3" }}
    >
      {!realArtist ? (
        <ErrorModal setRealArtist={setRealArtist} setInput={setInput} />
      ) : null}
      <div>
        <motion.div
          style={{
            height: height,
            width: height,
            x: x1,
            y: y1 - height / 2 - 36,
          }}
          animate={{
            rotate: degree,
          }}
          transition={{ duration: 1 }}
        >
          <div className="flex-col-top">
            <h2 className="ab">Search for</h2>
            <h2 className="sub"> artists </h2>
          </div>
          <Vinyl />
          <div className="flex-col-bottom">
            <h2 className="ab">Search for</h2>
            <h2 className="sub"> songs </h2>
          </div>
        </motion.div>
        <VinylSleeve
          vinySleeveRef={vinySleeveRef}
          setDegree={setDegree}
          degree={degree}
          setArtists={setArtists}
          input={input}
          setInput={setInput}
          setSearchOpen={setSearchOpen}
        />
      </div>
      {input.artist.length > 0 && (
        <CheckInputContainer
          setArtists={setArtists}
          artists={artists}
          input={input}
          setInput={setInput}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
        />
      )}
      <div className="button__container">
        <button>
          <div className="flex">
            <div className="sticker" onClick={() => searchForArtist()}>
              Search
            </div>
          </div>
        </button>
      </div>
    </motion.div>
  );
}
