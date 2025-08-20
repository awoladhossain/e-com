import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CategoryPage from "../pages/category/CategoryPage";
import Home from "../pages/home/Home";
import Shop from "../pages/shop/Shop";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
]);
export default router;
