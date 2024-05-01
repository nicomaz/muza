import React from "react";

export default function ErrorModal({ setRealArtist, setInput }) {
  setInput((...prevInput) => ({ ...prevInput, artist: "", song: "" }));
  return (
    <div id="open-modal" className="modal-window">
      <div>
        <button className="modal-close" onClick={() => setRealArtist(true)}>
          Close
        </button>
        <div className="error__text">Artist not found, please try again</div>
      </div>
    </div>
  );
}
