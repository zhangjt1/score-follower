import { useState } from 'react'
import './App.css'

function App() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected PDF:", file.name);
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    }
  }

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
      <h2>Upload a PDF</h2>
      <label htmlFor="pdf-upload" className="custom-file-label">
        Select PDF
      </label>
      <input 
        id="pdf-upload"
        type="file" 
        accept="application/pdf" 
        onChange={handleFileChange} 
        style={{ display: "none" }}
      />
      <div id="vertical-space" style={{ height: "24px" }} />
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
      {pdfUrl && (
        <div style={{ marginTop: "24px", width: "100%", maxWidth: "600px" }}>
          <iframe
            src={pdfUrl}
            title="PDF Preview"
            width="100%"
            height="300px"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
          />
        </div>
      )}

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

export default App
