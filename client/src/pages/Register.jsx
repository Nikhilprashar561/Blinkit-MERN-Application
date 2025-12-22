import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/ApiToastError";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

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
    if (data.password !== data.confirmPassword) {
      toast.error("Password is not confirm");
      return;
    }

    try {
      const response = await Axios({
        ...summaryApi.register,
        data: data,
      });

      if (response.data.message) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
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
        <p>Welcome to Blinkeyit</p>

        <form onSubmit={handleSubmit} className="grid gap-4 mt-6">
          <div className="grid gap-1">
            <label htmlFor="name">Name :</label>
            <input
              name="name"
              placeholder="Enter your name"
              id="name"
              value={data.name}
              onChange={handleChange}
              type="text"
              autoFocus
              className="bg-blue-50 p-2 border rounded-md outline-none focus:border-primary-200"
            />
          </div>
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
            Register
          </button>
        </form>
        <p>
          Already have account ?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;