import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/ApiToastError";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserDetails } from "../utils/fetchUserDetails";
import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch()

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
        ...summaryApi.login,
        data: data,
      });

      if (response.data.message) {
        toast.success(response.data.message);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        const userData = await fetchUserDetails()
        dispatch(setUserDetails(userData.data))

        setData({
          email: "",
          password: "",
        });
        navigate("/");
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
        <p>Login Here!</p>

        <form onSubmit={handleSubmit} className="grid gap-4 mt-6">
          <div className="grid gap-1">
            <label htmlFor="email">Email :</label>
            <input
              name="email"
              placeholder="Enter your email"
              id="email"
              value={data.email}
              onChange={handleChange}
              type="email"
              className="bg-blue-50 p-2 border rounded-md outline-none focus:border-primary-200"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password :</label>
            <div className="bg-blue-50 focus-within:border-primary-200 p-2 border flex items-center rounded-md">
              <input
                name="password"
                placeholder="Enter your password"
                id="password"
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
            <Link
              to={"/forgot-password"}
              className="block ml-auto hover:text-primary-200"
            >
              Forgot password ?
            </Link>
          </div>

          <button
            disabled={!valueFilled}
            className={` ${
              valueFilled ? "bg-green-800 hover:bg-green-600" : "bg-gray-400"
            } text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Login
          </button>
        </form>
        <p>
          Already have account ?{" "}
          <Link
            to={"/register"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;