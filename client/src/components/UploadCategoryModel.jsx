import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/uploadImage";
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast"
import AxiosToastError from "../utils/ApiToastError";


const UploadCategoryModel = ({ close , fetchData}) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
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
      const response = await Axios({
        ...SummaryApi.addCategory,
        data : data
      })
      const { data : responseData } = response
      if(responseData.success){
        toast.success(responseData.message)
        close()
        fetchData()
      }
    } catch (error) {
      AxiosToastError(error)
    } finally{
      setLoading(false)
    }
  }

  const handleUploadCargoryImages = async (e) => {
    const file = e.target.files[0]

    if(!file){
      return
    }
    const Response = await uploadImage(file)
    const {data : ImageResponse} = Response

    setData((prev) => {
      return {
        ...prev,
        image : ImageResponse.data.url
      }
    })
  }

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Category</h1>
          <button onClick={close} className="w-fit block ml-auto">
            <IoClose />
          </button>
        </div>
        <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label id="categoryName">Name</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              value={data.name}
              name="name"
              onChange={handleChange}
              className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 rounded outline-none"
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border flex bg-blue-50 h-36 items-center justify-center lg:w-36">
                {
                  data.image ? (
                    <img src={data.image} className="w-full h-full object-scale-down" alt="" />
                  ) : (
                    <p className="text-sm text text-neutral-500">No Images </p>
                  )
                }
              </div>
              <label htmlFor="uploadCategoryImage">
                <div className={
                `${!data.name ? "bg-gray-300" : "bg-primary-200"} px-4 py-1 rounded cursor-pointer`
              }>Upload Image</div>
              <input disabled={!data.name} onChange={handleUploadCargoryImages} id="uploadCategoryImage" className="hidden" type="file" />
              </label>
            </div>
          </div>
          <button className={
            `${data.name && data.image ? "bg-primary-200" : "bg-gray-400"}
            py-2 rounded font-semibold
            `
          }>Add Category</button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
