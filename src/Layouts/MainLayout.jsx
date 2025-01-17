import { Outlet } from "react-router-dom";
import Footer from "../Components/Shared/Footer";
import Navbar from "../Components/Shared/Navbar";

const MainLayout = () => {
  return (
    <div className="bg-slate-200">
      <Navbar></Navbar>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
