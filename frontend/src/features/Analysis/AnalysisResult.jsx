const AnalysisResult = ({ data }) => (
  <div className="bg-white shadow p-6 rounded w-full max-w-2xl">
    <h3 className="text-xl font-bold mb-2">Analysis Result</h3>
    {data.videoUrl && (
      <video src={data.videoUrl} controls className="w-full mb-4" />
    )}
    <div>
      <p><b>Hook:</b> {data.hook} <span className="text-xs text-green-600">({data.hookReason})</span></p>
      <p><b>Pacing:</b> {data.pacing}</p>
      <p><b>Tone:</b> {data.tone}</p>
      <p><b>CTA:</b> {data.cta}</p>
      <p><b>Trend Fit Score:</b> <span className="font-bold text-blue-600">{data.trendScore}%</span></p>
    </div>
    <pre className="bg-gray-100 rounded p-3 mt-2">{JSON.stringify(data, null, 2)}</pre>
  </div>
);
export default AnalysisResult;
