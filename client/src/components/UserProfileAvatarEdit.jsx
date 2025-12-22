import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/ApiToastError";
import { updatedAvatar } from "../store/userSlice";
import { IoClose } from "react-icons/io5";

function UserProfileAvatarEdit({ close }) {
  const user = useSelector((state) => state?.user);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const dispatch = useDispatch();
  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();

    formData.append("avatar", file);

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.userAvatarUpload,
        data: formData,
      });
      const { data: responseData } = response;
      dispatch(updatedAvatar(responseData.data.avatar));
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed p-4 flex items-center justify-center top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60">
      <div className="bg-white max-w-sm w-full rounded p-4 flex items-center flex-col justify-center">
        <button
          onClick={close}
          className="text-neutral-800 w-fit block ml-auto"
        >
          <IoClose />
        </button>
        <div className="w-20 h-20 rounded-full overflow-hidden drop-shadow-sm  bg-white flex items-center justify-center">
          {user.avatar ? (
            <img className="w-full h-full" src={user.avatar} alt={user.name} />
          ) : (
            <FaUserCircle />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="UploadProfile">
            {" "}
            <div className="border cursor-pointer border-primary-200 hover:bg-primary-200 px-4 py-1 rounded text-sm my-3">
              {loading ? "Loading..." : "Upload"}
            </div>
          </label>
          <input
            onChange={handleUploadAvatar}
            type="file"
            id="UploadProfile"
            className="hidden"
          />
        </form>
      </div>
    </section>
  );
}

export default UserProfileAvatarEdit;
