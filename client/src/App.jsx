import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen pt-20 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
