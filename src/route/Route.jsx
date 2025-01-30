import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import MainLayout from "../layout/MainLayout"


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
        
      ]
    },
    // {
    //   // path: "/dashboard",
    //   // element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    //   // children: [
       
        
    //   // ]
    // }
  ]);