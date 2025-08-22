import { useState } from "react";
import "./App.css";


function AudioViewer() {
  const [audioUrl, setAudioUrl] = useState(null);

  function handleAudioChange(event) {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected Audio:", file.name);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    }
  }


  return (
    <div className="input">

      <input
        id="audio-upload"
        type="file"
        accept="audio/*"
        onChange={handleAudioChange}
        style={{ display: "none" }}
      />
      <label htmlFor="audio-upload" className="custom-file-label">
        Select Audio
      </label>

      {audioUrl && (
        <div style={{ marginTop: "24px", width: "100%", maxWidth: "600px" }}>
          <audio controls src={audioUrl} style={{ width: "100%" }}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

export default AudioViewer;