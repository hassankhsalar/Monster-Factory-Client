import { Outlet } from "react-router-dom";
import DashBoard from "../Pages/DashBoard.jsx/dashBoard";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <div className="w-64 pt-6 bg-fuchsia-300 min-h-screen">
        <DashBoard></DashBoard>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
