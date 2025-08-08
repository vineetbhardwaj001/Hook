import { useState } from "react";
import VideoUpload from "./VideoUplooad";

export default function Analysis() {
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Video Analysis Tool</h2>

      <VideoUpload
        setAnalysisData={setAnalysisData}
        analysisData={analysisData}
      />

      {analysisData && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">🧠 Analysis Result</h3>
          <p><strong>🎯 Hook:</strong> {analysisData.hook}</p>
          <p><strong>🎵 Tone:</strong> {analysisData.tone}</p>
          <p><strong>📣 CTA:</strong> {analysisData.cta}</p>
          <p><strong>🧾 Entities:</strong> {analysisData.entities}</p>
          <p><strong>📝 Transcript:</strong> {analysisData.transcript}</p>
        </div>
      )}
    </div>
  );
}
