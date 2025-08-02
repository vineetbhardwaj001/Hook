import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <Navbar />
    <div className="flex-1">{children}</div>
  </div>
);

export default MainLayout;
