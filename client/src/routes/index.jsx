import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerificationOtp from "../pages/VerificationOtp";
import ForgotPassword from "../pages/ForgotPassword"
import ResetPassword from "../pages/ResetPassword";
import UserMenuPage from "../pages/UserMenuPage";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import Address from "../pages/Address";
import MyOrder from "../pages/MyOrder";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import UploadPoducts from "../pages/UploadPoducts";
import Products from "../pages/ProductAdmin";
import AdminPremission from "../layouts/AdminPremission";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CartMobile from "../pages/CartMobile";
import CheckoutPage from "../pages/CheckoutPage";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path:"forgot-password",
        element: < ForgotPassword />
      },
      {
        path :"verification-Otp",
        element: < VerificationOtp />
      },
      {
        path: "reset-password",
        element : < ResetPassword />
      },
      {
        path: "user",
        element: < UserMenuPage />
      },
      {
        path: "dashboard",
        element : < Dashboard />,
        children : [
          {
            path : "profile",
            element : < Profile />,
          },
          {
            path : "address",
            element : < Address />
          },
          {
            path : "myorders",
            element : < MyOrder />
          },
          {
            path : "category",
            element : <AdminPremission>< Category /></AdminPremission>
          },
          {
            path : "subCategory",
            element : <AdminPremission>< SubCategory /></AdminPremission>
          },
          {
            path : "uploadProduct",
            element : <AdminPremission>< UploadPoducts /></AdminPremission>
          },
          {
            path : "product",
            element : <AdminPremission>< Products /></AdminPremission>,
          },
        ]
      },
      {
                path : ":category",
                children : [
                    {
                        path : ":subCategory",
                        element : <ProductListPage/>
                    }
                ]
            },
            {
                path : "product/:product",
                element : <ProductDisplayPage/>
            },
            {
                path : 'cart',
                element : <CartMobile/>
            },
            {
                path : "checkout",
                element : <CheckoutPage/>
            },
            {
                path : "success",
                element : <Success/>
            },
            {
                path : 'cancel',
                element : <Cancel/>
            }
    ],
  },
]);

export default router;


// 100005910704533