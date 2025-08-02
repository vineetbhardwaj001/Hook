import { useState } from "react";
import Loader from "../../components/Loader";
import axios from "axios";

const VideoUpload = ({ setAnalysisData }) => {
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!video) return;
    setLoading(true);
    try {
      // TODO: Replace `/api/analysis` with your actual backend endpoint!
      const formData = new FormData();
      formData.append("video", video);
      // Example response format for MOCK:
      // const response = { data: { videoUrl: URL.createObjectURL(video), ... } };
      const response = await axios.post("/api/analysis", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAnalysisData(response.data);
    } catch (err) {
      alert("Analysis failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="flex flex-col gap-4 w-full max-w-md">
      <label>
        <span className="text-gray-700">Upload Video File (mp4):</span>
        <input
          type="file"
          accept="video/*"
          onChange={e => setVideo(e.target.files[0])}
          className="mt-1 block w-full"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white rounded py-2"
        disabled={loading}
      >
        {loading ? <Loader /> : "Analyze Video"}
      </button>
    </form>
  );
};

export default VideoUpload;
