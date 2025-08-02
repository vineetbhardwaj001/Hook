import { useState } from "react";

const DUMMY_USER = {
  email: "demo@hookai.com",
  name: "Demo User",
};

function useAuth() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  // For demo: replace with proper backend logic!
  const login = (email, password) => {
    if (email === "demo@hookai.com" && password === "demo123") {
      localStorage.setItem("user", JSON.stringify(DUMMY_USER));
      setUser(DUMMY_USER);
      return true;
    }
    return false;
  };
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return { user, login, logout };
}
export default useAuth;
