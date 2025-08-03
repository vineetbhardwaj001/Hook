import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await axios.post("https://mern-auth-flow.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        navigate("/");
      } else {
        setErr(res.data.message || "Registration failed.");
      }
    } catch (error) {
      setErr(error.response?.data?.message || "Server error. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
      >
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-bold text-sky-800">🪝 Hook AI</h1>
          <p className="text-sm text-gray-500 text-center mt-1">
            Create your account
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {err && <div className="text-red-500 text-sm">{err}</div>}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sky-600 hover:underline font-medium"
            >
              Log in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
