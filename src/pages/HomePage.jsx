import { ThemeContext } from "../contexts/Theme";
import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import VinylSleeve from "../components/VinylSleeve";
import Vinyl from "../components/Vinyl";
import CarouselButton from "../components/CarouselButton";

export default function HomePage() {
  const { theme } = useContext(ThemeContext);
  const [degree, setDegree] = useState(0);
  const [x1, setX] = useState(0);
  const [y1, setY] = useState(0);
  const [height, setHeight] = useState(0);
  const vinySleeveRef = useRef();

  const [width, setWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

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
      <div className="container">
        <CarouselButton
          setDegree={setDegree}
          degree={degree}
          number={-180}
          direction="left"
        />
        <motion.div
          style={{ height: height, width: height, x: x1, y: y1 - height / 2 + 1 }}
          animate={{
            rotate: degree,
          }}
          transition={{ duration: 1 }}
        >
          <Vinyl />
        </motion.div>
        <CarouselButton
          setDegree={setDegree}
          degree={degree}
          number={180}
          direction="right"
        />
        <VinylSleeve vinySleeveRef={vinySleeveRef} />
      </div>
    </motion.div>
  );
}
