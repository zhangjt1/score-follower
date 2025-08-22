import "./App.css";
import PdfViewer from "./pdfViewer.jsx";
import AudioViewer from "./audioViewer.jsx";

function App() {

  return (
    <div className="app-container">
      <PdfViewer />
      {/* vertical space */}
      <div style={{ height: "24px" }}></div>
      <AudioViewer />
    </div>
  );
}

export default App;
