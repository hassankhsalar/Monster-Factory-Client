import { Outlet } from "react-router-dom";
import DashBoard from "../Pages/DashBoard.jsx/dashBoard";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";

const DashboardLayout = () => {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="flex">
        <div className="w-64 pt-6 bg-fuchsia-300 min-h-screen">
          <DashBoard></DashBoard>
        </div>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
