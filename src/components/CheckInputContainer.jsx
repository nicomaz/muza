import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";

export default function CheckInputContainer({
  artists,
  input,
  setInput,
  searchOpen,
  setSearchOpen,
}) {
  const { theme } = useContext(ThemeContext);

  return (
    <motion.div
      className="checkinput__container"
      initial={{ opacity: 1, backgroundColor: "#6653ac" }}
      animate={{
        backgroundColor: theme === "artists" ? "#f6b6c6" : "#6ac3f3",
      }}
    >
      <div className="checkinput__container">
        {searchOpen && (
          <>
            <div id="checkinput__input">
              {input.artist.length > 0 ? input.artist : ""}
            </div>
            <ul>
              {input.artist.length > 0 &&
                artists.map((artist) => {
                  return (
                    <li
                      key={artist.name}
                      onClick={() => {
                        setInput((prevState) => ({
                          ...prevState,
                          artist: artist.name,
                        }));
                        setSearchOpen(false);
                      }}
                    >
                      <h3>{artist.name}</h3>
                    </li>
                  );
                })}
            </ul>
          </>
        )}
      </div>
    </motion.div>
  );
}
