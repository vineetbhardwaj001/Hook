import { useState } from "react";
import Loader from "../../components/Loader";
import axios from "axios";

const ScriptWizard = () => {
  const [params, setParams] = useState({ objective: "", tone: "", extra: "" });
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState("");

  const handleChange = (e) =>
    setParams({ ...params, [e.target.name]: e.target.value });

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Replace `/api/generate-script` with your backend endpoint
      const response = await axios.post("/api/generate-script", params);
      setScript(response.data.script);
    } catch {
      alert("Script generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full max-w-lg">
      <form className="flex flex-col gap-4" onSubmit={handleGenerate}>
        <label>
          Objective:
          <select name="objective" onChange={handleChange} value={params.objective} required className="ml-2 p-2 rounded">
            <option value="">Select</option>
            <option value="sales">Sales</option>
            <option value="awareness">Awareness</option>
            <option value="engagement">Engagement</option>
          </select>
        </label>
        <label>
          Tone:
          <select name="tone" onChange={handleChange} value={params.tone} required className="ml-2 p-2 rounded">
            <option value="">Select</option>
            <option value="funny">Funny</option>
            <option value="educational">Educational</option>
            <option value="witty">Witty</option>
          </select>
        </label>
        <input
          name="extra"
          value={params.extra}
          onChange={handleChange}
          placeholder="Enter product/brand info"
          className="p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? <Loader /> : "Generate Script"}
        </button>
      </form>
      {script && (
        <div className="mt-4 bg-gray-100 rounded p-4">
          <h4 className="font-bold mb-2">Generated Script:</h4>
          <pre>{script}</pre>
        </div>
      )}
    </div>
  );
};

export default ScriptWizard;
