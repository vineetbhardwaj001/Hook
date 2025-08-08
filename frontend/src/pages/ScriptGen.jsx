import { useState } from "react";
import axios from "axios";

const objectives = [
  {
    value: "sales",
    label: "Drive Sales",
    description: "Convert viewers to customers",
    icon: (
      <span className="inline-block rounded-full bg-green-50 p-4 text-3xl">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#16a34a"><path d="M12 21c4.97 0 9-3.8 9-8.5S16.97 4 12 4 3 7.8 3 12.5 7.03 21 12 21zm0-16c3.87 0 7 2.93 7 6.5s-3.13 6.5-7 6.5-7-2.93-7-6.5S8.13 5 12 5zm1 2h-2v3.28c-.58.22-1 .76-1 1.37 0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5c0-.61-.42-1.15-1-1.37V7z"/></svg>
      </span>
    ),
  },
  {
    value: "awareness",
    label: "Brand Awareness",
    description: "Increase brand recognition",
    icon: (
      <span className="inline-block rounded-full bg-blue-50 p-4 text-3xl">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#2563eb"><path d="M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 2a6 6 0 1 0 0 12A6 6 0 0 0 12 6zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>
      </span>
    ),
  },
  {
    value: "engagement",
    label: "Engagement",
    description: "Build community interaction",
    icon: (
      <span className="inline-block rounded-full bg-red-50 p-4 text-3xl">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#ea3859"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.41 4.41 3 7.5 3c1.74 0 3.41 1 4.5 2.09C13.09 4 14.76 3 16.5 3 19.59 3 22 5.41 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"/></svg>
      </span>
    ),
  },
];

export default function ScriptGenerator() {
  const [step, setStep] = useState(1);
  const [objective, setObjective] = useState('');
  const [tone, setTone] = useState('');
  const [productName, setProductName] = useState('');
  const [benefits, setBenefits] = useState('');
  const [audience, setAudience] = useState('');
  const [platform, setPlatform] = useState('TikTok (15-60s)');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step === 1 && objective) setStep(2);
    else if (step === 2 && tone) setStep(3);
    else if (step === 3 && productName && benefits && audience && platform) handleGenerate();
  };

  const handlePrev = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(3);
  };

  const handleGenerate = async (e) => {
  if (e) e.preventDefault();
  setLoading(true);
  try {
    const res = await axios.post('https://mern-auth-flow.onrender.com/api/generate-script', {
      objective,
      tone,
      productName,
      benefits,
      audience,
      platform
    });

    setScript(res.data.script || "Here's your generated script!");
    setStep(4);
  } catch (error) {
    console.error(error); // Show real error
    alert('Script generation failed');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-[70vh] bg-[#fbfbf9] flex flex-col items-center justify-center py-10">
      <form
        className="bg-white max-w-xl w-full rounded-2xl shadow-lg px-10 py-10 flex flex-col gap-10"
        onSubmit={handleGenerate}
      >
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="flex flex-col items-start gap-2">
              <span className="text-lg font-bold text-[#1db5be] bg-[#e8fbfb] w-10 h-10 rounded-full flex items-center justify-center mb-2">1</span>
              <h1 className="text-xl md:text-2xl font-bold text-gray-700">Choose Your Objective</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {objectives.map(obj => (
                <button
                  key={obj.value}
                  type="button"
                  className={`transition-all border border-gray-100 hover:border-[#1db5be] bg-gray-50 hover:bg-[#e8fbfb] rounded-xl flex flex-col items-center px-8 py-6 space-y-2 shadow-sm ${objective === obj.value ? 'ring-2 ring-[#1db5be] scale-[1.04]' : ''}`}
                  onClick={() => setObjective(obj.value)}
                >
                  {obj.icon}
                  <span className="mt-2 font-semibold text-base text-gray-700">{obj.label}</span>
                  <span className="text-xs text-gray-500">{obj.description}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button type="button" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold shadow" disabled>Previous</button>
              <button
                type="button"
                className="px-6 py-2 bg-[#1db5be] text-white rounded-lg font-bold shadow"
                onClick={handleNext}
                disabled={!objective}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="flex flex-col items-start gap-2">
              <span className="text-lg font-bold text-[#1db5be] bg-[#e8fbfb] w-10 h-10 rounded-full flex items-center justify-center mb-2">2</span>
              <h1 className="text-xl md:text-2xl font-bold text-gray-700">Select Tone & Style</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {[
                { value: "funny", label: "Funny & Entertaining", desc: "Make people laugh and share", icon: "😄" },
                { value: "educational", label: "Educational & Informative", desc: "Teach valuable insights", icon: "📚" },
                { value: "witty", label: "Witty & Clever", desc: "Smart humor and wordplay", icon: "🧠" },
                { value: "inspiring", label: "Inspiring & Motivating", desc: "Motivate and uplift viewers", icon: "✨" },
              ].map(item => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setTone(item.value)}
                  className={`transition-all border border-gray-100 hover:border-[#1db5be] bg-gray-50 hover:bg-[#e8fbfb] rounded-xl flex flex-col items-center px-8 py-6 space-y-2 shadow-sm ${tone === item.value ? 'ring-2 ring-[#1db5be] scale-[1.04]' : ''}`}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span className="mt-2 font-semibold text-base text-gray-700">{item.label}</span>
                  <span className="text-xs text-gray-500">{item.desc}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-between gap-4 mt-6">
              <button type="button" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold shadow" onClick={handlePrev}>Previous</button>
              <button
                type="button"
                className="px-6 py-2 bg-[#1db5be] text-white rounded-lg font-bold shadow"
                onClick={handleNext}
                disabled={!tone}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div className="flex flex-col items-start gap-2">
              <span className="text-lg font-bold text-[#1db5be] bg-[#e8fbfb] w-10 h-10 rounded-full flex items-center justify-center mb-2">3</span>
              <h1 className="text-xl md:text-2xl font-bold text-gray-700">Product & Brand Details</h1>
            </div>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Product/Service Name</span>
              <input className="w-full p-2 border rounded mt-1" placeholder="e.g. Productivity App, Fitness Course, AI Tool" value={productName} onChange={(e) => setProductName(e.target.value)} required />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Key Benefits (one per line)</span>
              <textarea className="w-full p-2 border rounded mt-1" placeholder={`e.g.\nSaves 2 hours daily\nIncreases focus by 50%`} rows={4} value={benefits} onChange={(e) => setBenefits(e.target.value)} required />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Target Audience</span>
              <input className="w-full p-2 border rounded mt-1" placeholder="e.g. Busy professionals, Fitness enthusiasts" value={audience} onChange={(e) => setAudience(e.target.value)} required />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Target Platform</span>
              <select className="w-full p-2 border rounded mt-1" value={platform} onChange={(e) => setPlatform(e.target.value)} required>
                <option>TikTok (15-60s)</option>
                <option>Instagram Reels (15-90s)</option>
                <option>YouTube Shorts (15-60s)</option>
              </select>
            </label>
            <div className="flex justify-between gap-4 mt-6">
              <button type="button" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold shadow" onClick={handlePrev}>Previous</button>
              <button type="button" className="px-6 py-2 bg-[#1db5be] text-white rounded-lg font-bold shadow" onClick={handleNext} disabled={!productName || !benefits || !audience || !platform}>Generate</button>
            </div>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <div className="flex flex-col items-start gap-2">
              <span className="text-lg font-bold text-[#1db5be] bg-[#e8fbfb] w-10 h-10 rounded-full flex items-center justify-center mb-2">4</span>
              <h1 className="text-xl md:text-2xl font-bold text-gray-700">Your Generated Script</h1>
            </div>
            <div className="w-full">
              {loading ? (
                <div className="py-8 text-center text-gray-400 text-lg">Please wait, generating...</div>
              ) : (
                !!script && (
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-2 shadow">
                    <h2 className="font-semibold mb-2 text-[#1db5be]">Generated Script</h2>
                    <pre className="text-gray-700 whitespace-pre-wrap">{script}</pre>
                  </div>
                )
              )}
            </div>
            <div className="flex justify-between items-center gap-4 mt-8">
              <button type="button" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold shadow" onClick={() => { setStep(3); setScript(""); }}>Previous</button>
              <button type="button" className="bg-gray-300 px-6 py-2 rounded-lg font-bold text-gray-700 shadow" onClick={() => navigator.clipboard.writeText(script)}>Export</button>
              <button type="button" className="bg-[#1db5be] text-white px-6 py-2 rounded-lg font-bold shadow" onClick={() => { setStep(1); setObjective(''); setTone(''); setProductName(''); setBenefits(''); setAudience(''); setPlatform(''); setScript(''); }}>Create Another</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}


/*import { useState } from "react";
import axios from "axios";

const objectives = [
  {
    value: "sales",
    label: "Drive Sales",
    description: "Convert viewers to customers",
    icon: (
      <span className="inline-block rounded-full bg-green-50 p-4 text-3xl">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#16a34a"><path d="M12 21c4.97 0 9-3.8 9-8.5S16.97 4 12 4 3 7.8 3 12.5 7.03 21 12 21zm0-16c3.87 0 7 2.93 7 6.5s-3.13 6.5-7 6.5-7-2.93-7-6.5S8.13 5 12 5zm1 2h-2v3.28c-.58.22-1 .76-1 1.37 0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5c0-.61-.42-1.15-1-1.37V7z"/></svg>
      </span>
    ),
  },
  {
    value: "awareness",
    label: "Brand Awareness",
    description: "Increase brand recognition",
    icon: (
      <span className="inline-block rounded-full bg-blue-50 p-4 text-3xl">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#2563eb"><path d="M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 2a6 6 0 1 0 0 12A6 6 0 0 0 12 6zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>
      </span>
    ),
  },
  {
    value: "engagement",
    label: "Engagement",
    description: "Build community interaction",
    icon: (
      <span className="inline-block rounded-full bg-red-50 p-4 text-3xl">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#ea3859"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.41 4.41 3 7.5 3c1.74 0 3.41 1 4.5 2.09C13.09 4 14.76 3 16.5 3 19.59 3 22 5.41 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"/></svg>
      </span>
    ),
  },
];

export default function ScriptGenerator() {
  const [step, setStep] = useState(1);
  const [objective, setObjective] = useState('');
  const [tone, setTone] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);

  // Handlers for navigation
  const handleNext = () => {
    // If on step 1 and objective selected, go to step 2
    if (step === 1 && objective) setStep(2);
    // If on step 2 and tone/productInfo provided, generate script
    else if (step === 2 && tone && productInfo) handleGenerate();
  };

  const handlePrev = () => {
    if (step === 2) setStep(1);
  };

  // Script generation with API call
  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      // Your real endpoint goes here
      const res = await axios.post('/api/generate-script', { objective, tone, productInfo });
      setScript(res.data.script || "Here's your generated script!");
      setStep(3);
    } catch {
      alert('Script generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-[#fbfbf9] flex flex-col items-center justify-center py-10">
      <form className="bg-white max-w-xl w-full rounded-2xl shadow-lg px-10 py-10 flex flex-col gap-10" onSubmit={handleGenerate}>
        {/* STEP 1: Objective select *///}
      /*  {step === 1 && (
          <>
            <div className="flex flex-col items-start gap-2">
              <span className="text-lg font-bold text-[#1db5be] bg-[#e8fbfb] w-10 h-10 rounded-full flex items-center justify-center mb-2">
                1
              </span>
              <h1 className="text-xl md:text-2xl font-bold text-gray-700">Choose Your Objective</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {objectives.map(obj => (
                <button
                  key={obj.value}
                  type="button"
                  className={`
                    transition-all border border-gray-100 hover:border-[#1db5be] bg-gray-50 hover:bg-[#e8fbfb]
                    rounded-xl flex flex-col items-center px-8 py-6 space-y-2 shadow-sm
                    ${objective === obj.value ? 'ring-2 ring-[#1db5be] scale-[1.04]' : ''}
                  `}
                  onClick={() => setObjective(obj.value)}
                >
                  {obj.icon}
                  <span className="mt-2 font-semibold text-base text-gray-700">{obj.label}</span>
                  <span className="text-xs text-gray-500">{obj.description}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
                disabled
              >
                Previous
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-[#1db5be] text-white rounded-lg font-bold shadow hover:bg-[#13a0ae] transition"
                onClick={handleNext}
                disabled={!objective}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* STEP 2: Tone and Product Info *///}
      /*  {step === 2 && (
  <>
    <div className="flex flex-col items-start gap-2">
      <span className="text-lg font-bold text-[#1db5be] bg-[#e8fbfb] w-10 h-10 rounded-full flex items-center justify-center mb-2">
        2
      </span>
      <h1 className="text-xl md:text-2xl font-bold text-gray-700">Select Tone & Style</h1>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
      {[
        { value: "funny", label: "Funny & Entertaining", desc: "Make people laugh and share", icon: "😄" },
        { value: "educational", label: "Educational & Informative", desc: "Teach valuable insights", icon: "📚" },
        { value: "witty", label: "Witty & Clever", desc: "Smart humor and wordplay", icon: "🧠" },
        { value: "inspiring", label: "Inspiring & Motivating", desc: "Motivate and uplift viewers", icon: "✨" },
      ].map(item => (
        <button
          key={item.value}
          type="button"
          onClick={() => setTone(item.value)}
          className={`
            transition-all border border-gray-100 hover:border-[#1db5be] bg-gray-50 hover:bg-[#e8fbfb]
            rounded-xl flex flex-col items-center px-8 py-6 space-y-2 shadow-sm
            ${tone === item.value ? 'ring-2 ring-[#1db5be] scale-[1.04]' : ''}
          `}
        >
          <span className="text-3xl">{item.icon}</span>
          <span className="mt-2 font-semibold text-base text-gray-700">{item.label}</span>
          <span className="text-xs text-gray-500">{item.desc}</span>
        </button>
      ))}
    </div>

    <div className="mt-6">
      <label className="w-full block">
        <span className="font-medium text-gray-700 mb-1 block">Product / Brand Info</span>
        <input
          className="w-full p-2 border rounded"
          placeholder="Describe your product..."
          value={productInfo}
          onChange={e => setProductInfo(e.target.value)}
          required
        />
      </label>
    </div>

    <div className="flex justify-between gap-4 mt-6">
      <button
        type="button"
        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
        onClick={handlePrev}
      >
        Previous
      </button>
      <button
        type="button"
        className="px-6 py-2 bg-[#1db5be] text-white rounded-lg font-bold shadow hover:bg-[#13a0ae] transition"
        onClick={handleNext}
        disabled={!tone || !productInfo}
      >
        Next
      </button>
    </div>
  </>
)}

        {/* STEP 3: Script output + actions *///}
       /* {step === 3 && (
  <>
    <div className="flex flex-col items-start gap-2">
      <span className="text-lg font-bold text-[#1db5be] bg-[#e8fbfb] w-10 h-10 rounded-full flex items-center justify-center mb-2">
        3
      </span>
      <h1 className="text-xl md:text-2xl font-bold text-gray-700">Product & Brand Details</h1>
    </div>

    <label className="block">
      <span className="text-sm font-medium text-gray-700">Product/Service Name</span>
      <input
        className="w-full p-2 border rounded mt-1"
        placeholder="e.g. Productivity App, Fitness Course, AI Tool"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />
    </label>

    <label className="block">
      <span className="text-sm font-medium text-gray-700">Key Benefits (one per line)</span>
      <textarea
        className="w-full p-2 border rounded mt-1"
        placeholder={`e.g.\nSaves 2 hours daily\nIncreases focus by 50%\nEasy to use interface`}
        rows={4}
        value={benefits}
        onChange={(e) => setBenefits(e.target.value)}
        required
      />
    </label>

    <label className="block">
      <span className="text-sm font-medium text-gray-700">Target Audience</span>
      <input
        className="w-full p-2 border rounded mt-1"
        placeholder="e.g. Busy professionals, Fitness enthusiasts, Content creators"
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
        required
      />
    </label>

    <label className="block">
      <span className="text-sm font-medium text-gray-700">Target Platform</span>
      <select
        className="w-full p-2 border rounded mt-1"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        required
      >
        <option>TikTok (15-60s)</option>
        <option>Instagram Reels (15-90s)</option>
        <option>YouTube Shorts (15-60s)</option>
      </select>
    </label>

    <div className="flex justify-between gap-4 mt-6">
      <button
        type="button"
        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
        onClick={handlePrev}
      >
        Previous
      </button>
      <button
        type="button"
        className="px-6 py-2 bg-[#1db5be] text-white rounded-lg font-bold shadow hover:bg-[#13a0ae] transition"
        onClick={handleNext}
        disabled={!productName || !benefits || !audience || !platform}
      >
        Generate
      </button>
    </div>
  </>
)}
      </form>
    </div>
  );
}*/
