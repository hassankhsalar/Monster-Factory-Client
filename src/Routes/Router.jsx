import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AllTrainers from "../Pages/AllTrainers/AllTrainers";
import Error from "../Pages/Error";
import Login from "../Pages/Account/Login";
import Register from "../Pages/Account/Register";
import PrivateRouter from "./PrivateRouter";
import BeATrainer from "../Pages/Trainer/BeATrainer";
import TrainerDetails from "../Pages/AllTrainers/TrainerDetails";
import AllClasses from "../Pages/Allclasses/AllClasses";
import BookedTrainer from "../Pages/AllTrainers/BookedTrainer";
import Payment from "../Pages/payment/Payment";
import DashboardLayout from "../Layouts/DashboardLayout";
import BookedTrainerCart from "../Pages/DashBoard.jsx/BookedTrainerCart";


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
        element: <PrivateRouter><AllTrainers></AllTrainers></PrivateRouter>,
      },
      {
        path: "/allclasses",
        element: <AllClasses></AllClasses>
      },
      {
        path: "/communityforums",
        
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/beatrainer",
        element: <BeATrainer></BeATrainer>
      },
      {
        path: "/alltrainers/:id", 
        element: <TrainerDetails></TrainerDetails>,
      },
      
      {
        path: "/bookedtrainer", 
        element: <BookedTrainer></BookedTrainer>,
      },
      {
        path: "/payment", 
        element: <Payment></Payment>,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: '/dashboard/bookedtrainercart',
        element: <BookedTrainerCart></BookedTrainerCart>
      },
    ]
  },
  {
    path: "*",
    element: <Error></Error>
  }
  
]);
