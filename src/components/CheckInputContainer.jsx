export default function CheckInputContainer({
  artists,
  input,
  setInput,
  searchOpen,
  setSearchOpen,
}) {
  return (
    <div>
      {searchOpen && (
        <>
          <div>{input.artist.length > 0 ? input.artist : ""}</div>
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
  );
}
