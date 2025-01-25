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
import DashboardLayout from "../Layouts/DashboardLayout";
import BookedTrainerCart from "../Pages/DashBoard.jsx/BookedTrainerCart";
import DashboardAllTrainer from "../Pages/DashBoard.jsx/DashboardAllTrainer";
import AppliedTrainer from "../Pages/DashBoard.jsx/admin/AppliedTrainer";
import AppliedTrainerDetails from "../Pages/DashBoard.jsx/admin/AppliedTrainerDetails";
import NewsletterSubscribers from "../Pages/DashBoard.jsx/NewsletterSubscribers";
import AddNewClass from "../Pages/DashBoard.jsx/AddNewClass";
import AdminRoute from "./AdminRoute";
import Payment from "../Pages/DashBoard.jsx/payment/Payment";
import Balance from "../Pages/DashBoard.jsx/admin/Balance";
import ActivityLog from "../Pages/DashBoard.jsx/Member/ActivityLog";
import Profile from "../Pages/DashBoard.jsx/Profile";
import EnrolledClasses from "../Pages/DashBoard.jsx/Member/EnrolledClasses";
import AddNewForum from "../Pages/DashBoard.jsx/AddNewForum";
import CommunityForums from "../Pages/Forum/CommunityForums";


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
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/beatrainer",
        element: <PrivateRouter><BeATrainer></BeATrainer></PrivateRouter>,
      },
      {
        path: "/alltrainers/:id", 
        element: <TrainerDetails></TrainerDetails>,
      },
      
      {
        path: "/bookedtrainer", 
        element: <PrivateRouter><BookedTrainer></BookedTrainer></PrivateRouter>,
      },
      {
        path: "/communityforums", 
        element: <CommunityForums>,</CommunityForums>,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>,
    children: [
      //Member routes
      {
        path: '/dashboard/bookedtrainercart',
        element: <BookedTrainerCart></BookedTrainerCart>,
      },
      {
        path: '/dashboard/payment',
        element: <Payment></Payment>,
      },
      
      {
        path: '/dashboard/activitylog',
        element: <ActivityLog></ActivityLog>,
      },
      {
        path: '/dashboard/profile',
        element: <Profile></Profile>,
      },
      {
        path: '/dashboard/enrolledClasses',
        element: <EnrolledClasses></EnrolledClasses>,
      },
      // admin routes
      {
        path: '/dashboard/alltrainer',
        element: <AdminRoute><DashboardAllTrainer></DashboardAllTrainer></AdminRoute>,
      },
      {
        path: '/dashboard/appliedtrainer',
        element: <AdminRoute><AppliedTrainer></AppliedTrainer></AdminRoute>
      },
      
      {
        path: '/dashboard/appliedtrainerdetails/:id',
        element: <AdminRoute><AppliedTrainerDetails></AppliedTrainerDetails></AdminRoute>
      },
      {
        path: '/dashboard/allnewsletters',
        element: <AdminRoute><NewsletterSubscribers></NewsletterSubscribers></AdminRoute>
      },
      {
        path: '/dashboard/addnewclass',
        element: <AdminRoute><AddNewClass></AddNewClass></AdminRoute>
      },
      {
        path: '/dashboard/balance',
        element: <AdminRoute><Balance></Balance></AdminRoute>
      },
      //trainer routes

      //shared route(admin trainer)
      {
        path: '/dashboard/addnewforum',
        element: <AddNewForum></AddNewForum>
      },

    ]
  },
  {
    path: "*",
    element: <Error></Error>
  }
  
]);
