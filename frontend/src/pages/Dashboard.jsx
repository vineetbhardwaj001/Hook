import React from "react";
import { Link } from "react-router-dom"; // <-- Add this import

export default function Dashboard() {
  const stats = [
    { label: "Videos Analyzed", value: 47 },
    { label: "Scripts Generated", value: 23 },
    { label: "Avg Trend Score", value: "84%" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-2">
      <div className="w-full max-w-11xl bg-white rounded-5xl shadow-xl py-10 px-8 flex flex-col gap-10">
        {/* Greetings and Plan */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div>
            <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
              Welcome back, vineet bhardwaj! <span className="text-2xl">👋</span>
            </h1>
            <p className="text-gray-500 mt-1">Ready to create your next viral hit?</p>
          </div>
        </div>

        {/* Actions + Stats */}
        <div className="flex flex-col md:flex-row gap-10 w-full">
          {/* Actions left */}
          <div className="flex-1 flex flex-col gap-6">
            <Link to="/analyze">
              <button className="flex items-center justify-between w-full bg-blue-50 py-5 px-6 rounded-xl shadow hover:bg-blue-100 transition group">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">📊</span>
                  <div>
                    <div className="font-bold text-lg text-gray-700">Analyze Video</div>
                    <div className="text-gray-500 text-sm">Get AI insights on your content</div>
                  </div>
                </div>
                <span className="text-blue-700 font-bold text-2xl">47</span>
              </button>
            </Link>

            <Link to="/generate-script">
              <button className="flex items-center justify-between w-full bg-blue-50 py-5 px-6 rounded-xl shadow hover:bg-blue-100 transition group">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">📝</span>
                  <div>
                    <div className="font-bold text-lg text-gray-700">Generate Script</div>
                    <div className="text-gray-500 text-sm">Create viral scripts with AI</div>
                  </div>
                </div>
                <span className="text-blue-700 font-bold text-2xl">23</span>
              </button>
            </Link>

            <Link to="/trends">
              <button className="flex items-center justify-between w-full bg-blue-50 py-5 px-6 rounded-xl shadow hover:bg-blue-100 transition group">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <div className="font-bold text-lg text-gray-700">View Trends</div>
                    <div className="text-gray-500 text-sm">Discover what's going viral</div>
                  </div>
                </div>
                <span className="text-blue-700 font-bold text-2xl">84%</span>
              </button>
            </Link>
          </div>

          {/* Stats right */}
          <div className="flex flex-col justify-between gap-6 w-full max-w-xs">
            {stats.map(stat => (
              <div
                key={stat.label}
                className="bg-blue-50 rounded-xl shadow text-center py-8"
              >
                <div className="text-3xl font-bold text-blue-700">{stat.value}</div>
                <div className="text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="pt-4">
          <h3 className="text-base font-semibold text-gray-700 mb-1">Recent Activity</h3>
          <p className="text-gray-400 text-sm">No recent activity yet.</p>
        </div>
      </div>
    </div>
  );
}
