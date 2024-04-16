import getArtist from "../utils/api";

export default function FormsContainer({
  setArtists,
  input,
  setInput,
  setSearchOpen,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const searchForArtist = (e) => {
    e.preventDefault();
    setSearchOpen(true);
    const { value } = e.target[0];
    getArtist(value).then((artists) => setArtists(artists));
  };

  return (
    <div className="forms">
      <form onSubmit={searchForArtist}>
        <div>
          <label className="has-float-label">
            <input
              type="text"
              name="artist"
              placeholder="Artist"
              value={input.artist}
              onChange={handleChange}
            />
            <span>Artist</span>
            <button></button>
          </label>
        </div>
      </form>
    </div>
  );
}
