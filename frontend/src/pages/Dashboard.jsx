// Dashboard.jsx
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate(); // <-- Add this

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
        Welcome back, Alex! <span>👋</span>
      </h2>
      <div className="flex-col md:flex-row flex gap-8">
        {/* Quick Actions */}
        <div className="flex-1 flex flex-col gap-5">
  <Link to="/analysis">
    <ActionCard
      icon="📊"
      title="Analyze Video"
      desc="Get AI insights on your content"
    />
  </Link>

  <Link to="/scriptgen">
    <ActionCard
      icon="📝"
      title="Generate Script"
      desc="Create viral scripts with AI"
    />
  </Link>

  <Link to="/trending">
    <ActionCard
      icon="🔥"
      title="View Trends"
      desc="Discover what's going viral"
    />
  </Link>
</div>

        {/* Your Performance */}
        <div className="flex-1 flex flex-col gap-5 mt-8 md:mt-0">
          <StatCard stat={47} desc="Videos Analyzed" />
          <StatCard stat={23} desc="Scripts Generated" />
          <StatCard stat="84%" desc="Avg Trend Score" />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-12">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Recent Activity</h3>
        <div className="bg-white rounded-xl shadow p-0">
          <RecentActivityItem
            title="Product Launch Video"
            date="July 25, 2025"
            trendScore={82}
          />
          <RecentActivityItem
            title="Behind the Scenes"
            date="July 24, 2025"
            trendScore={75}
            border={false}
          />
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-lg shadow-md flex items-center gap-4 px-6 py-4 hover:shadow-lg transition-all group">
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="font-semibold text-md text-gray-800 group-hover:text-[#1db5be] transition">{title}</div>
        <div className="text-sm text-gray-500">{desc}</div>
      </div>
    </div>
  );
}

function StatCard({ stat, desc }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
      <span className="text-3xl text-[#1db5be] font-bold">{stat}</span>
      <span className="text-gray-700 mt-1">{desc}</span>
    </div>
  );
}

function RecentActivityItem({ title, date, trendScore, border = true }) {
  return (
    <div className={`flex items-center justify-between px-7 py-5 ${border?'border-b border-gray-100':''}`}>
      <div>
        <div className="font-semibold text-gray-800">{title}</div>
        <div className="text-xs text-gray-500 mt-1">Analyzed • {date}</div>
      </div>
      <span className="bg-[#e8fbfb] text-[#1db5be] px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
        {trendScore}% Trend Score
      </span>
    </div>
  );
}
