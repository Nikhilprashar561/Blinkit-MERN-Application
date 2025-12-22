import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import Axios from "../utils/Axios"
import AxiosToastError from "../utils/ApiToastError";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { fetchUserDetails } from "../utils/fetchUserDetails";
import { setUserDetails } from "../store/userSlice";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  useEffect(()=>{
        setUserData({
            name : user.name,
            email : user.email,
            mobile : user.mobile,
        })
    },[user])

  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        setLoading(true)
        const response= await Axios({
            ...SummaryApi.userUpdateDetails,
            data : userData
        })
        const {data : responseData} = response
        if(responseData.success){
            toast.success(responseData.message)
            const userData = await fetchUserDetails();
            dispatch(setUserDetails(userData.data))
        } 
    } catch (error) {
        AxiosToastError(error)
    } finally {
        setLoading(false)
    }

  }
  return (
    <div className="p-4">
      <div className="w-20 h-20 rounded-full overflow-hidden drop-shadow-sm  bg-white flex items-center justify-center">
        {user.avatar ? (
          <img className="w-full h-full" src={user.avatar} alt={user.name} />
        ) : (
          <FaUserCircle />
        )}
      </div>
      <button
        onClick={() => setProfileAvatarEdit(true)}
        className="text-sm min-w-20 border-primary-100 hover:border-primary-200 hover:bg-primary-100 border px-3 py-1 rounded-full mt-3"
      >
        Edit
      </button>
      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
      )}

      {/* Update user Name, email etc.. */}
      <form onSubmit={handleSubmit} className="my-4 gap-8">
        <div className="grid">
          <label>Name</label>
          <input
            name="name"
            onChange={handleOnChange}
            value={userData.name}
            type="text"
            placeholder="Enter your name"
            className="bg-blue-50 p-2 outline-none rounded border focus-within:border-primary-200"
          />
        </div>
        <div className="grid">
          <label htmlFor="email">Email :</label>
          <input
            name="email"
            id="email"
            onChange={handleOnChange}
            value={userData.email}
            type="email"
            placeholder="Enter your email"
            className="bg-blue-50 p-2 outline-none rounded border focus-within:border-primary-200"
          />
        </div>
        <div className="grid">
          <label>Mobile</label>
          <input
            name="mobile"
            onChange={handleOnChange}
            value={userData.mobile}
            type="text"
            placeholder="Enter your mobile"
            className="bg-blue-50 p-2 outline-none rounded border focus-within:border-primary-200"
          />
        </div>

        <button className="border mt-2 px-4 py-2 font-semibold hover:bg-primary-200 border-primary-200 text-primary-200 hover:text-neutral-800 rounded">
          { loading ? "Loading..." : "Upload" }
        </button>
      </form>
    </div>
  );
}
