import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/ApiToastError";
import { RiShareForwardBoxLine } from "react-icons/ri";
import { isAdmin } from "../utils/isAdmin";

export default function UserMenu({ close }) {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChangle = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.userLogout,
      });
      if (response.data.success) {
        if (close) {
          close();
        }
        close();
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm cursor-pointer flex items-center gap-3">
        <Link to={"/dashboard/profile"}>
          {" "}
          {user.name || user.mobile}{" "}
          <span className="text-medium text-red-700">({user.role === "ADMIN" ? "Admin" : ""})</span>{" "}
        </Link>
        <Link onClick={handleClose} to={"/dashboard/profile"}>
          <RiShareForwardBoxLine size={15} />
        </Link>
      </div>
      <Divider />
      <div className="text-sm grid gap-2">
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            className="px-2"
            to={"/dashboard/category"}
          >
            Category
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            className="px-2"
            to={"/dashboard/subCategory"}
          >
            Sub Category
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            className="px-2"
            to={"/dashboard/uploadProduct"}
          >
            Upload Product
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            className="px-2"
            to={"/dashboard/product"}
          >
            Products
          </Link>
        )}
        <Link onClick={handleClose} className="px-2" to={"/dashboard/myorders"}>
          My Orders
        </Link>
        <Link onClick={handleClose} className="px-2" to={"/dashboard/address"}>
          Address
        </Link>
        <button
          onClick={handleChangle}
          className="text-left rounded-md px-4 w-fit bg-blue-700 cursor-pointer font-bold text-white p-1.5"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
