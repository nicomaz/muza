import React, { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";

export default function CarouselButton({
  setDegree,
  degree,
  number,
  direction,
}) {
  const { theme, setTheme } = useContext(ThemeContext);

  
  return (
    <button
      className={direction}
      onClick={() => {
        theme === "songs" ? setTheme("artists") : setTheme("songs");
        setDegree(degree + number);
        
      }}
    >
      <span className="material-symbols-outlined">chevron_{direction}</span>
    </button>
  );
}
