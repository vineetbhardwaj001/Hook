import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const menu = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Analyze", path: "/analysis" },
  { label: "Script Gen", path: "/scriptgen" },
  { label: "Trending", path: "/trending" }, // ✅ Added this line
];


export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-blue-600 ">🪝 Hook AI</span>
        </div>

        {/* Middle: Navigation Menu */}
        <nav className="hidden md:flex items-center gap-6">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition duration-300 ease-in-out ${
                location.pathname === item.path
                  ? "text-blue-700 border-b-2 border-blue-600 pb-1"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Logout */}
        <div>
          <button
            onClick={handleLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition duration-300 shadow"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
