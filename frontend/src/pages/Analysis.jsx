import { useState } from "react";
import { motion } from "framer-motion";

export default function VideoUpload({ setAnalysisData }) {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [dragOver, setDragOver] = useState(false);

  // Mock analyzer
  function handleAnalyze(e) {
    e.preventDefault();
    setAnalysisData({
      videoUrl: videoFile ? URL.createObjectURL(videoFile) : videoUrl,
      hook: "Wait, you're telling me this $5 trick actually works?",
      hookReason: "Creates curiosity + skepticism + low effort.",
      pacing: "Fast",
      tone: "Excited",
      cta: "Try it yourself today!",
      trendScore: 84
    });
  }

  function onDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video")) setVideoFile(file);
  }

  return (
    <form
      onSubmit={handleAnalyze}
      className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-7"
    >
      {/* Drag & Drop Panel */}
      <motion.div
        className={`w-full border-2 border-dashed ${
          dragOver ? "border-[#1db5be] bg-[#e8fbfb]" : "border-[#d1f4f5] bg-gray-50"
        } rounded-xl py-10 flex justify-center items-center flex-col cursor-pointer transition`}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={e => { e.preventDefault(); setDragOver(false); }}
        onDrop={onDrop}
        onClick={() => document.getElementById('video-input').click()}
        whileHover={{scale: 1.01}}
      >
        <span className="text-5xl mb-1">📽️</span>
        <div className="font-semibold text-[#1db5be]">Drag & drop your video here</div>
        <span className="text-gray-500 text-sm mb-1 mt-2">(mp4, mov, max 70MB, up to 120s)</span>
        <input
          id="video-input"
          type="file"
          accept="video/*"
          hidden
          onChange={e => setVideoFile(e.target.files[0])}
        />
        {videoFile && (
          <span className="mt-2 text-xs text-[#1db5be]">
            {videoFile.name}
          </span>
        )}
      </motion.div>
      
      {/* Or paste a video URL */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-gray-700 font-medium text-sm mb-1">
          Or paste a video URL
        </label>
        <input
          className="w-full px-4 py-2 border rounded focus:outline-[#1db5be] text-black bg-white"
          type="url"
          placeholder="https://tiktok.com/@user/video/123456789"
          value={videoUrl}
          onChange={e => setVideoUrl(e.target.value)}
        />
      </div>
      
      <button
        type="submit"
        className="w-full mt-2 py-2 bg-[#1db5be] text-white font-bold rounded transition hover:bg-[#13a0ae] shadow"
      >
        Analyze Video
      </button>
    </form>
  );
}
