import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AllTrainers from "../Pages/AllTrainers/AllTrainers";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/alltrainers",
        element: <AllTrainers></AllTrainers>,
      },
      {
        path: "/allclasses",
        
      },
      {
        path: "/communityforums",
        
      },
    ],
  },
]);
