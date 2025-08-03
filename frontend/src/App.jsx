import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import ScriptGen from "./pages/ScriptGen";
import Login from "./pages/Login";
import Register from "./pages/Register"; // ✅ added Register import
import useAuth from "./hooks/useAuth";
import Trending from "./pages/Trending";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/" element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />

      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          user ? (
            <MainLayout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/scriptgen" element={<ScriptGen />} />
                <Route path="/trending" element={<Trending />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </MainLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
 
