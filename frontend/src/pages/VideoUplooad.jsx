import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useTypingEffect } from "./useTypingEffect"; // import the hook

export default function VideoAnalysis() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video")) {
      setVideoFile(file);
      setVideoUrl("");
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!videoFile && !videoUrl.trim()) {
      alert("Please upload a video file or enter a video URL.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      if (videoFile) {
        formData.append("video", videoFile);
      } else {
        formData.append("videoUrl", videoUrl.trim());
      }

      const res = await axios.post("https://mern-auth-flow.onrender.com/api/analysis", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data);
    } catch (err) {
      console.error("❌ Analysis error:", err);
      alert("Failed to analyze video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Prepare texts safely from result for typing animation
  const safeText = (field) => {
    if (!result) return "";
    if (typeof result[field] === "string") return result[field];
    if (result[field]?.text) return result[field].text;
    return JSON.stringify(result[field], null, 2);
  };

  // Typed text for each field
  const hookTyping = useTypingEffect(safeText("hook"));
  const toneTyping = useTypingEffect(safeText("tone"));
  const ctaTyping = useTypingEffect(safeText("cta"));
  const transcriptTyping = useTypingEffect(safeText("transcript"), 10);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#1db5be]">🎥 Video Analysis</h1>

      <form onSubmit={handleAnalyze} className="flex flex-col gap-6">
        {/* Drag & Drop */}
        <motion.div
          className={`border-2 border-dashed rounded-xl py-10 flex flex-col items-center justify-center cursor-pointer transition
            ${dragOver ? "border-[#1db5be] bg-[#e8fbfb]" : "border-[#d1f4f5] bg-gray-50"}
          `}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragOver(false);
          }}
          onDrop={onDrop}
          onClick={() => document.getElementById("video-input").click()}
          whileHover={{ scale: 1.02 }}
        >
          <span className="text-6xl mb-3 select-none">📽️</span>
          <p className="font-semibold text-[#1db5be] select-none">Drag & drop your video here</p>
          <p className="text-gray-500 text-sm mt-1 select-none">(mp4, mov, max 70MB)</p>

          <input
            id="video-input"
            type="file"
            accept="video/*"
            hidden
            onChange={(e) => {
              setVideoFile(e.target.files[0]);
              setVideoUrl("");
            }}
          />
          {videoFile && <p className="mt-3 text-sm text-[#1db5be] select-text">{videoFile.name}</p>}
        </motion.div>

        {/* URL Input */}
        <div className="flex flex-col gap-1">
          <label htmlFor="video-url" className="font-medium text-gray-700 text-sm">
            Or paste a video URL
          </label>
          <input
            id="video-url"
            type="url"
            placeholder="https://tiktok.com/@user/video/123456789"
            value={videoUrl}
            onChange={(e) => {
              setVideoUrl(e.target.value);
              setVideoFile(null);
            }}
            className="border rounded px-3 py-2 focus:outline-[#1db5be] focus:ring-1 focus:ring-[#1db5be] text-black"
          />
        </div>

        {/* Analyze Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 font-bold rounded shadow text-white transition
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#1db5be] hover:bg-[#13a0ae]"}
          `}
        >
          {loading ? "Analyzing..." : "Analyze Video"}
        </button>
      </form>

      {/* Result Display */}
      {result && (
        <div className="mt-8 space-y-6 bg-[#f0f9f9] p-6 rounded-lg shadow-inner border border-[#1db5be]">
          {/* Hook */}
          <Section title="Hook" icon="🎣">
            <p className="whitespace-pre-wrap text-gray-800">{hookTyping}</p>
          </Section>

          {/* Tone */}
          <Section title="Tone" icon="🎼">
            <p className="whitespace-pre-wrap text-gray-800">{toneTyping}</p>
          </Section>

          {/* CTA */}
          <Section title="Call To Action" icon="👉">
            <p className="whitespace-pre-wrap text-gray-800">{ctaTyping}</p>
          </Section>

          {/* Entities */}
          {result.entities && Array.isArray(result.entities) && (
            <Section title="Entities" icon="📌">
              <div className="flex flex-wrap gap-2">
                {result.entities.map((entity, idx) => (
                  <span
                    key={idx}
                    className="bg-[#1db5be] text-white px-3 py-1 rounded-full text-sm select-text"
                    title={`Approx. time: ${entity.approxTimeSec}s`}
                  >
                    {entity.text}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Transcript */}
          <Section title="Transcript" icon="📝">
            <pre className="max-h-48 overflow-auto whitespace-pre-wrap p-3 bg-white rounded shadow-inner border border-gray-300 text-gray-900">
              {transcriptTyping}
            </pre>
          </Section>

          {/* Excel Download */}
          {result.excelPath && (
            <a
              href={`http://localhost:5000/uploads/${result.excelPath}`}
              download
              className="inline-block mt-4 px-6 py-3 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
            >
              📊 Download Excel Report
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#1db5be] flex items-center gap-2 mb-2">
        <span>{icon}</span> {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}
