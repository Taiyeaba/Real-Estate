import { createBrowserRouter } from "react-router";
import MainLayout from "../layout.jsx/MainLayout";
import Error from "../shared/Error";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
    ]
  },
]);