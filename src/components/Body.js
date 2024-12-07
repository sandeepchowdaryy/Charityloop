import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import DonationDrives from "./DonationDrives";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Login from "./Login";
import SignUp from "./SignUp";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import DonorPage from "../Pages/DonorPage";
import LogisticsController from "../Pages/LogisticsController";
import RecipientPage from "../Pages/RecipientPage";
import AdminPage from "../Pages/AdminPage";
import Donate from "./Donate";
import DriveDetails from "./DriveDetails";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/donationDrives",
        element: <DonationDrives />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "donor",
        element: <DonorPage />,
      },
      {
        path: "logisticController",
        element: <LogisticsController />,
      },
      {
        path: "recipient",
        element: <RecipientPage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
      {
        path:"donate",
        element: <Donate/>
      },{
        path:"donationdrive/:driveId",
        element: <DriveDetails/>
      }
    ],
  },
]);

const Body = () => {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
};

export default Body;
