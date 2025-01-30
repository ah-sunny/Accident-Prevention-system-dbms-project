import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import MainLayout from "../layout/MainLayout"
import AboutUs from "../pages/aboutUs/AboutUs";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import { OverView } from "../pages/Dashboard/OverView";
import Place from "../pages/Dashboard/Place";
import { AddPlace } from "../pages/Dashboard/AddPlace";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/about-us',
        element: <AboutUs></AboutUs>
      }

    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute> <Dashboard></Dashboard> </PrivateRoute>,
    children: [
      {
        path: '/dashboard/overview',
        element: <OverView></OverView>
      },
      {
        path: "/dashboard/place",
        element: <Place></Place>
      },
      {
        path: "/dashboard/add-place",
        element: <AddPlace></AddPlace>
      }


    ]
  }
]);