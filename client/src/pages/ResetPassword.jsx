import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import toast from "react-hot-toast";
import summaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/ApiToastError";
import Axios from "../utils/Axios";

const ResetPassword = () => {
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((prev) => {
        return {
          ...prev,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const valueFilled = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...summaryApi.resetPassword,
        data: data,
      });

      if (response.data.message) {
        toast.success(response.data.message);
        navigate("/login");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }

      if (response.data.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="my-4 bg-white w-full max-w-lg mx-auto rounded p-10">
        <p>Enter Your Password</p>

        <form onSubmit={handleSubmit} className="grid gap-4 mt-6">
          <div className="grid gap-1">
            <label htmlFor="newPassword">New Password :</label>
            <div className="bg-blue-50 focus-within:border-primary-200 p-2 border flex items-center rounded-md">
              <input
                name="newPassword"
                placeholder="Enter your password"
                id="newPassword"
                value={data.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                className="w-full outline-none"
              />
              <div
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <IoEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">confirm Password :</label>
            <div className="bg-blue-50 focus-within:border-primary-200 p-2 border flex items-center rounded-md">
              <input
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Enter confirm Password"
                value={data.confirmPassword}
                onChange={handleChange}
                type={showConfirmPassword ? "text" : "password"}
                className="w-full outline-none"
              />
              <div
                className="cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <IoEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>

          <button
            disabled={!valueFilled}
            className={` ${
              valueFilled ? "bg-green-800 hover:bg-green-600" : "bg-gray-400"
            } text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;