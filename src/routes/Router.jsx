import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home";
import ShopAll from "../pages/ShopAll";
import ProductDetail from "../pages/ProductDetail";
import NewDrops from "../pages/NewDrops";
import AboutUs from "../pages/AboutUs";

import Reviews from "../pages/Reviews";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/shop-all", // / যুক্ত করুন
        element: <ShopAll />,
      },
      {
        path: "/product/:id", // <--- একদম শুরুতে / পরম গুরুত্বপূর্ণ
        element: <ProductDetail />,
      },
      {
        path: "/new-drops",
        Component: NewDrops,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },

      {
        path: "/reviews",
        Component: Reviews,
      },
    ],
  },
]);
