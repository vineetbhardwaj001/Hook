import { useState } from "react";
import VideoUpload from "../features/Analysis/VideoUpload";
import AnalysisResult from "../features/Analysis/AnalysisResult";

const Analysis = () => {
  const [analysis, setAnalysis] = useState(null);
  return (
    <div className="flex flex-col gap-8 px-8 py-8">
      <h2 className="text-2xl font-semibold">Video Analysis</h2>
      <VideoUpload setAnalysisData={setAnalysis} />
      {analysis && <AnalysisResult data={analysis} />}
    </div>
  );
};
export default Analysis;
