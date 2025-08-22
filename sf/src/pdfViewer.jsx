import { useState, useRef, useEffect } from "react";
import "./App.css";

// pdf.js imports
import * as pdfjs from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker?worker";

// Attach the worker (Vite fix)
if (typeof window !== "undefined" && "Worker" in window) {
  window.pdfjsWorker = pdfjsWorker;
  pdfjs.GlobalWorkerOptions.workerSrc = window.location.origin + "/pdf.worker.min.mjs";
}

function PdfViewer() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const canvasRef = useRef(null);

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      setPageNum(1);
    }
  }

  // Load PDF document when pdfUrl changes
  useEffect(() => {
    if (!pdfUrl) return;

    const loadPdf = async () => {
      const loadingTask = pdfjs.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      setPdfDoc(pdf);
      setNumPages(pdf.numPages);
      setPageNum(1);
    };

    loadPdf();
  }, [pdfUrl]);

  // Render current page when pdfDoc or pageNum changes
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    const renderPdf = async () => {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;
    };

    renderPdf();
  }, [pdfDoc, pageNum]);

  function goToPrevPage() {
    setPageNum((prev) => Math.max(prev - 1, 1));
  }

  function goToNextPage() {
    setPageNum((prev) => Math.min(prev + 1, numPages));
  }

  return (
    <div className="pdf-input">
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

      {pdfUrl && (
        <div style={{ marginTop: "24px", width: "100%", maxWidth: "600px" }}>
          <canvas
            ref={canvasRef}
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
          />
          <div style={{ marginTop: "16px", textAlign: "center" }}>
            <button onClick={goToPrevPage} disabled={pageNum <= 1}>
              Previous
            </button>
            <span style={{ margin: "0 12px" }}>
              Page {pageNum} of {numPages}
            </span>
            <button onClick={goToNextPage} disabled={pageNum >= numPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PdfViewer;