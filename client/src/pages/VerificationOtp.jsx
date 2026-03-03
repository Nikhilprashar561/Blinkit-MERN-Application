import React, { useEffect, useRef, useState } from "react";
// import { FaEyeSlash } from "react-icons/fa";
// import { IoEye } from "react-icons/io5";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/ApiToastError";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();

  const inputRef = useRef([]);

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, []);

  const location = useLocation();
  const valueFilled = data.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...summaryApi.VerifyOtp,
        data: {
          otp: data.join(""),
          email: location?.state?.email,
        },
      });

      if (response.data.message) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password", {
          state: {
            data: response.data,
            email: location?.state?.email,
          },
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
        <p className="font-semibold text-lg">Enter OTP</p>

        <form onSubmit={handleSubmit} className="grid gap-4 mt-6">
          <div className="grid gap-1">
            <label htmlFor="otp">Enter your OTP :</label>
            <div className="flex items-center gap-2 justify-between mt-3">
              {data.map((element, index) => {
                return (
                  <input
                    key={"otp" + index}
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    id="otp"
                    maxLength={1}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;

                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    type="text"
                    className="bg-blue-50 w-full text-center font-semibold max-w-16 p-2 border rounded-md outline-none focus:border-primary-200"
                  />
                );
              })}
            </div>
          </div>

          <button
            disabled={!valueFilled}
            className={` ${
              valueFilled ? "bg-green-800 hover:bg-green-600" : "bg-gray-400"
            } text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Verify OTP
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
