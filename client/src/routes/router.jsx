import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import CategoryPage from "../pages/category/CategoryPage";
import Error from "../pages/error/Error";
import Home from "../pages/home/Home";
import Shop from "../pages/shop/Shop";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/categories/:categoryName",
        element: <CategoryPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
export default router;
