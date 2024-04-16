import { ThemeContext } from "../contexts/Theme";
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import VinylSleeve from "../components/VinylSleeve";
import Vinyl from "../components/Vinyl";
import CheckInputContainer from "../components/CheckInputContainer";

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

  return (
    <motion.div
      className="background"
      initial={{ opacity: 1, backgroundColor: "#f6b6c6" }}
      animate={{ backgroundColor: theme === "songs" ? "#f6b6c6" : "#6ac3f3" }}
    >
      <div>
        <motion.div
          style={{
            height: height,
            width: height,
            x: x1,
            y: y1 - height / 2 + 1,
          }}
          animate={{
            rotate: degree,
          }}
          transition={{ duration: 1 }}
        >
          <div className="flex-col-top">
            <h2 className="ab">search for</h2>
            <h2 className="song sub"> artists </h2>
          </div>
          <Vinyl />
          <div className="flex-col-bottom">
            <h2 className="ab">search for</h2>
            <h2 className="song sub"> songs </h2>
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
      <CheckInputContainer
        setArtists={setArtists}
        artists={artists}
        input={input}
        setInput={setInput}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />
    </motion.div>
  );
}
