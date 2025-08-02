import React from "react";

// --- Viral Hooks Data ---
const viralHooks = [
  {
    text: '“POV: You just discovered the hack everyone\'s been hiding”',
    used: "2.3K",
    rate: "94%",
    platforms: ["TikTok", "Instagram"],
  },
  {
    text: '“This changed my life in 30 seconds (no clickbait!)”',
    used: "1.8K",
    rate: "89%",
    platforms: ["YouTube", "TikTok"],
  },
  {
    text: '“If you don’t know this trick, you’re wasting money”',
    used: "1.5K",
    rate: "92%",
    platforms: ["Instagram", "TikTok"],
  },
];

// --- Top Templates Data ---
const templates = [
  {
    name: "Problem-Solution Hook",
    effective: "91%",
    steps: [
      "Hook Question",
      "→",
      "Problem Amplification",
      "→",
      "Solution Demo",
      "→",
      "Results",
      "→",
      "CTA"
    ],
    desc: "Identifies a common problem and presents quick solution",
    best: "Product demos, Life hacks, Tutorials",
  },
  {
    name: "Transformation Story",
    effective: "88%",
    steps: [
      "Before State",
      "→",
      "Turning Point",
      "→",
      "Process",
      "→",
      "After State",
      "→",
      "CTA"
    ],
    desc: "Shows before/after transformation with emotional appeal",
    best: "Personal development, Fitness, Business success",
  },
];

// --- Platform Insights Data ---
const platforms = [
  {
    name: "TikTok",
    color: "bg-[#e8fbfb] text-[#1db5be]",
    icon: "🎵",
    duration: "15-30s optimal",
    category: "Educational",
    best: "6-9 PM",
    sound: "Original Audio",
    hook: "2-3 seconds",
  },
  {
    name: "Instagram",
    color: "bg-[#fff5f2] text-[#ee7952]",
    icon: "📸",
    duration: "15-30s optimal",
    category: "Lifestyle",
    best: "12-3 PM",
    hashtag: "#viral #fyp",
    engagement: "4-8%",
  },
  {
    name: "YouTube",
    color: "bg-[#faf3f3] text-[#c34f43]",
    icon: "▶️",
    duration: "30-45s optimal",
    category: "How-to",
    best: "2-4 PM",
    ctr: "Numbers in title",
    watch: "65%",
  },
];

// --- Card Components ---

function ViralHookCard({ hook }) {
  return (
    <div className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col hover:scale-[1.02] transition duration-200">
      <div className="text-gray-800 font-semibold mb-3">{hook.text}</div>
      <div className="flex gap-5 items-center text-sm mb-2">
        <span className="text-gray-500">Used <b className="text-[#1db5be]">{hook.used} times</b></span>
        <span className="text-gray-500">|</span>
        <span className="text-green-600">{hook.rate} success rate</span>
      </div>
      <div className="flex gap-2 mt-auto">
        {hook.platforms.map(p =>
          <span key={p} className="px-2 py-0.5 text-xs rounded bg-[#e8fbfb] text-[#1db5be] font-medium">{p}</span>
        )}
      </div>
    </div>
  );
}

function TemplateCard({ tpl }) {
  return (
    <div className="flex-1 bg-white rounded-xl shadow p-6 relative mb-2 flex flex-col">
      <div className="flex gap-1 items-center mb-2">
        <span className="font-bold text-blue-700">{tpl.name}</span>
        <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">{tpl.effective} Effective</span>
      </div>
      <div className="text-gray-600 text-[0.95rem] mb-3">{tpl.desc}</div>
      <div className="flex flex-wrap gap-2 font-mono text-xs font-semibold text-[#1db5be] mb-2">
        {tpl.steps.map((s,i) =>
          <span key={i}>{s}</span>
        )}
      </div>
      <div className="text-xs text-gray-500 mt-auto">Best for: <span className="font-medium text-gray-600">{tpl.best}</span></div>
    </div>
  );
}

function PlatformInsightCard({ platform }) {
  return (
    <div className={`flex-1 rounded-xl shadow bg-white flex flex-col items-start px-6 py-5 gap-2`}>
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-xl font-semibold ${platform.color}`}>{platform.icon}</span>
        <span className={`font-bold text-lg`}>{platform.name}</span>
        <span className="ml-2 text-xs font-semibold text-gray-400">{platform.duration}</span>
      </div>
      <div className="text-[0.95rem] text-gray-600">Top Category: <span className="font-semibold text-black">{platform.category}</span></div>
      <div className="text-xs text-gray-500">
        Best Time: <span className="font-medium">{platform.best}</span>
        {platform.sound && <span className="ml-2">| <b>Trending Sound:</b> {platform.sound}</span>}
        {platform.hashtag && <span className="ml-2">| <b>Top Hashtags:</b> {platform.hashtag}</span>}
        {platform.engagement && <span className="ml-2">| Engagement: {platform.engagement}</span>}
        {platform.ctr && <span className="ml-2">| CTR Boost: {platform.ctr}</span>}
        {platform.hook && <span className="ml-2">| Hook Length: {platform.hook}</span>}
        {platform.watch && <span className="ml-2">| Avg Watch Time: {platform.watch}</span>}
      </div>
    </div>
  );
}

// --- Main Page Component ---

export default function HookAIDashboardMerged() {
  return (
    <div className="min-h-screen bg-[#fbfbf9] pb-14">
      {/* Trending Now Header */}
      <div className="max-w-6xl mx-auto pt-12 px-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold tracking-tight">Trending Now</h1>
          <span className="text-xl">🔥</span>
        </div>
        <p className="text-gray-500 mb-8 text-[1.03rem]">Discover viral patterns and optimize your content</p>

        {/* Viral Hooks Section */}
        <h2 className="font-semibold text-[1.11rem] mb-4">Viral Hooks This Week</h2>
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          {viralHooks.map((h, i) =>
            <ViralHookCard key={i} hook={h} />
          )}
        </div>

        {/* Top Performing Templates */}
        <h2 className="font-semibold text-[1.11rem] mb-4">Top Performing Templates</h2>
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          {templates.map((tpl, idx) =>
            <TemplateCard key={idx} tpl={tpl} />
          )}
        </div>
        
        {/* Platform Insights Section */}
        <h2 className="font-semibold text-[1.11rem] mb-4">Platform Insights</h2>
        <div className="flex flex-col md:flex-row gap-6">
          {platforms.map((p, i) =>
            <PlatformInsightCard key={i} platform={p} />
          )}
        </div>
      </div>
    </div>
  );
}
