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
import DetailsAccident from "../pages/Dashboard/DetailsAccident";
import SingleDetails from "../pages/Dashboard/SingleDetails";
import MyRequest from "../pages/Dashboard/MyRequest";
import EditRequest from "../pages/Dashboard/EditRequest";
import AllUser from "../pages/Dashboard/admin/AllUser";


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
      },
      {
        path: "/dashboard/details-accident/:location",
        element: <DetailsAccident></DetailsAccident>
      },
      {
        path: "/dashboard/single-details/:accidentID",
        element: <SingleDetails></SingleDetails>
      },
      {
        path: "/dashboard/my-request",
        element: <MyRequest></MyRequest>
      },
      {
        path: "/dashboard/edit-request/:requestAccidentID",
        element: <EditRequest></EditRequest>
      },
      {
        path: "/dashboard/alluser",
        element: <AllUser></AllUser>
      }


    ]
  }
]);