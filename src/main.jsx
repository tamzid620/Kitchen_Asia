import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
import Home from "./Components/Pages/Home/Home";
import ErrorPage from "./Components/Pages/ErrorPage/ErrorPage";
import Layout from "./Components/Layout/Layout";
import Menu from "./Components/Pages/Menu/Menu";
import OrderTracking from "./Components/Pages/OrderTracking/OrderTracking";
import PlatteringService from "./Components/Pages/PlatteringService/PlatteringService";
import AboutUs from "./Components/Pages/QuickLinks/AboutUs";
import Contact from "./Components/Pages/QuickLinks/Contact";
import Cart from "./Components/Pages/Cart/Cart";
import WishList from "./Components/Pages/Home/WishList/WishList";
import AdminPanel from "./Components/Pages/AdminPanel/AdminPanel";
import AdminLogin from "./Components/Pages/AdminPanel/AdminLogin";
import AdminCategoryAdd from "./Components/Pages/AdminPanel/Navigation/AdminCategoryAdd";
import AdminCategory from "./Components/Pages/AdminPanel/Navigation/AdminCategory";
import AdminSubCategory from "./Components/Pages/AdminPanel/Navigation/AdminSubCategory";
import AdminFoodItem from "./Components/Pages/AdminPanel/Navigation/AdminFoodItem";
import AdminCategoryEdit from "./Components/Pages/AdminPanel/Navigation/AdminCategoryEdit";
import AdminSubCategoryEdit from "./Components/Pages/AdminPanel/Navigation/AdminSubCategoryEdit";
import AdminSubCategoryAdd from "./Components/Pages/AdminPanel/Navigation/AdminSubCategoryAdd";
import AdminFoodItemEdit from "./Components/Pages/AdminPanel/Navigation/AdminFoodItemEdit";
import AdminFoodItemAdd from "./Components/Pages/AdminPanel/Navigation/AdminFoodItemAdd";
import Order from "./Components/Shared/Order/Order";
import AdminOrderList from "./Components/Pages/AdminPanel/Navigation/AdminOrderList";
import AdminOrderDelivery from "./Components/Pages/AdminPanel/Navigation/AdminOrderDelivery";
import AdminOrderDetails from "./Components/Pages/AdminPanel/Navigation/AdminOrderDetails";
import AdminOrderProcessing from "./Components/Pages/AdminPanel/Navigation/AdminOrderProcessing";
import Invoice from "./Invoice/Invoice";
import UserOrderDetails from "./Components/Pages/UserOrderDetails/UserOrderDetails";
import Reservation from "./Components/Shared/Reservation/Reservation";
import Press from "./Components/Shared/Press/Press";
import AdminReservation from "./Components/Pages/AdminPanel/Navigation/AdminReservation";
import AdminEmployeeList from "./Components/Pages/AdminPanel/Navigation/AdminEmployeeList";
import AdminEmployeeEdit from "./Components/Pages/AdminPanel/Navigation/AdminEmployeeEdit";
import AdminEmployeeAdd from "./Components/Pages/AdminPanel/Navigation/AdminEmployeeAdd";
import AdminEmployeeDetail from "./Components/Pages/AdminPanel/Navigation/AdminEmployeeDetail";
import AdminPressList from "./Components/Pages/AdminPanel/Navigation/AdminPressList";
import AdminPressEdit from "./Components/Pages/AdminPanel/Navigation/AdminPressEdit";
import AdminPressAdd from "./Components/Pages/AdminPanel/Navigation/AdminPressAdd";
import AdminPackageList from "./Components/Pages/AdminPanel/Navigation/AdminPackageList";
import AdminPackageEdit from "./Components/Pages/AdminPanel/Navigation/AdminPackageEdit";
import AdminPackageAdd from "./Components/Pages/AdminPanel/Navigation/AdminPackageAdd";
import AdminDeliveryManList from "./Components/Pages/AdminPanel/Navigation/AdminDeliveryManList";
import AdminDeliveryManEdit from "./Components/Pages/AdminPanel/Navigation/AdminDeliveryManEdit";
import AdminDeliveryManAdd from "./Components/Pages/AdminPanel/Navigation/AdminDeliveryManAdd";
import CreateDeliveryPanel from "./Components/Pages/AdminPanel/Navigation/CreateDeliveryPanel";
import DeliveryManPanel from "./Components/Pages/DeliveryManPanel/DeliveryManPanel";
import DeliveryAssignList from "./Components/Pages/DeliveryManPanel/DeliveryAssignList";
import OrderPackage from "./Components/Shared/Order/OrderPackage";
import AdminReservationApprovedList from "./Components/Pages/AdminPanel/Navigation/AdminReservationApprovedList";
// import { ThemeProvider } from "@material-tailwind/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/wishlist",
        element: <WishList />,
      },
      {
        path: "/ordertracking",
        element: <OrderTracking />,
      },
      {
        path: "/userOrderDetails/:orderId",
        element: <UserOrderDetails />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/reservation",
        element: <Reservation />,
      },
      {
        path: "/press",
        element: <Press />,
      },
      {
        path: "/platterService",
        element: <PlatteringService />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/contactUs",
        element: <Contact />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/orderPackage",
        element: <OrderPackage />,
      },
      {
        path: "/adminReservationList",
        element: <AdminReservation />,
      },
      {
        path: "/adminReservationApprovedList",
        element: <AdminReservationApprovedList />,
      },
      // Admin Login ------------------------------
      {
        path: "/adminlogin",
        element: <AdminLogin />,
      },
      // AdminPanel section ------------------------
      {
        path: "/dp",
        element: <AdminPanel />,
      },
      // DeliveryManPanel section ------------------------
      {
        path: "/deliverymanPanel",
        element: <DeliveryManPanel />,
      },
      {
        path: "/deliveryAssignList",
        element: <DeliveryAssignList />,
      },
      //category section  -------------------------
      {
        path: "/adminCategory",
        element: <AdminCategory />,
      },
      {
        path: "/adminCategoryEdit/:categoryId",
        element: <AdminCategoryEdit />,
      },
      {
        path: "/adminategoryAdd",
        element: <AdminCategoryAdd />,
      },
      //Sub category section  -------------------------
      {
        path: "/adminSubCategory",
        element: <AdminSubCategory />,
      },
      {
        path: "/adminSubCategoryEdit/:subCategoryId",
        element: <AdminSubCategoryEdit />,
      },
      {
        path: "/adminSubCategoryAdd",
        element: <AdminSubCategoryAdd />,
      },
      //Food Item section  -------------------------
      {
        path: "/adminFoodItem",
        element: <AdminFoodItem />,
      },
      {
        path: "/adminFoodItemEdit/:foodItemId",
        element: <AdminFoodItemEdit />,
      },
      {
        path: "/adminFoodItemAdd",
        element: <AdminFoodItemAdd />,
      },
      //Package section  -------------------------
      {
        path: "/adminPackageList",
        element: <AdminPackageList />,
      },
      {
        path: "/adminPackageEdit/:packageId",
        element: <AdminPackageEdit />,
      },
      {
        path: "/adminPackageAdd",
        element: <AdminPackageAdd />,
      },
      // Order section ----------------
      {
        path: "/adminOrderList",
        element: <AdminOrderList />,
      },
      {
        path: "/adminOrderDetails/:orderId",
        element: <AdminOrderDetails />,
      },
      {
        path: "/adminOrderProcessing/:orderId",
        element: <AdminOrderProcessing />,
      },
      {
        path: "/invoice/:orderId",
        element: <Invoice />,
      },
       // Order Delivery section --------------------------
      {
        path: "/adminOrderDelivery",
        element: <AdminOrderDelivery />,
      },
      // Employee section --------------------------
      {
        path: "/adminEmployeeList",
        element: <AdminEmployeeList />,
      },
      {
        path: "/adminEmployeeEdit/:employeeId",
        element: <AdminEmployeeEdit />,
      },
      {
        path: "/adminEmployeeDetails/:employeeId",
        element: <AdminEmployeeDetail />,
      },
      {
        path: "/adminEmployeeAdd",
        element: <AdminEmployeeAdd />,
      },
      // DeliveryMan section --------------------------
      {
        path: "/adminDeliveryManList",
        element: <AdminDeliveryManList />,
      },
      {
        path: "/adminDeliveryManEdit/:deliveryManId",
        element: <AdminDeliveryManEdit />,
      },
      {
        path: "/adminDeliveryManAdd",
        element: <AdminDeliveryManAdd />,
      },
       // DeliveryPanel section --------------------------
      {
        path: "/createDeliveryPanel/:deliveryManId",
        element: <CreateDeliveryPanel />,
      },
      // Press section --------------------------
      {
        path: "/adminPressList",
        element: <AdminPressList />,
      },
      {
        path: "/adminPressEdit/:pressId",
        element: <AdminPressEdit />,
      },
      {
        path: "/adminPressAdd",
        element: <AdminPressAdd />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ThemeProvider> */}
    <RouterProvider router={router} />
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
