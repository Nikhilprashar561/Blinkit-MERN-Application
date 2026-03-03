import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/uploadImage";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios"
import AxiosToastError from "../utils/ApiToastError";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const UploadSubCategoryModel = ({ close }) => {
  const [subCategory, setSubCategory] = useState({
    name: "",
    image: "",
    catgory: [],
  });

  const allCategory = useSelector((state) => state.product.allCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSubCategory((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    const Response = await uploadImage(file);
    const { data: ImageResponse } = Response;

    setSubCategory((prev) => {
      return {
        ...prev,
        image: ImageResponse.data.url,
      };
    });
  };

  const handleRemoveCategory = (categoryId) => {
    const index = subCategory.catgory.findIndex((el) => el._id === categoryId);
    const newSubCategoryData = subCategory.catgory.splice(index, 1);
    setSubCategory((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault()
    try {
      const response = await Axios({
        ...SummaryApi.addSubCategory,
        data: subCategory
      })
      const { data : responseData } = response
      if(responseData.success){
        toast.success(responseData.message)
        if(close){
          close()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="fixed flex items-center justify-center top-0 right-0 left-0 bottom-0 bg-neutral-700 bg-opacity-70 z-50 p-4">
      <div className="w-full max-w-5xl bg-white p-4 rounded">
        <div className="flex items-center justify-center gap-3">
          <h1 className="font-semibold">Add Sub Category</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <form className="my-3 grid gap-3" onSubmit={handleSubmitSubCategory}>
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              id="name"
              name="name"
              value={subCategory.name}
              className="p-3 bg-blue-50 outline-none rounded focus-within:border-primary-200"
              type="text"
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <div className="w-full lg:w-36 h-36 bg-blue-50 flex items-center justify-center">
                {!subCategory.image ? (
                  <p className="text-sm text-neutral-400">No Image</p>
                ) : (
                  <img
                    src={""}
                    className="w-full h-full object-scale-down"
                    alt=""
                  />
                )}
              </div>
              <label htmlFor="uploadSub">
                <div className=" px-4 rounded hover:bg-primary-200 hover:text-black  py-1 border border-primary-200 text-primary-200">
                  Upload Image
                </div>
                <input
                  onChange={handleUploadImage}
                  type="file"
                  id="uploadSub"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="">Select Category</label>
            <div className="border focus-within:border-primary-200 rounded">
              {/** Display Value */}
              <div className="flex flex-wrap gap-1">
                {subCategory.catgory.map((cat, index) => {
                  return (
                    <p
                      className="bg-white shadow-md flex items-center gap-1 justify-center px-1 m-1"
                      key={cat._id}
                    >
                      {cat.name}
                      <div
                        onClick={() => handleRemoveCategory(cat._id)}
                        className="cursor-pointer"
                      >
                        <IoClose size={18} />
                      </div>
                    </p>
                  );
                })}
              </div>

              {/** Select Category */}
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryIndex = allCategory.find(
                    (el) => el._id == value
                  );
                  setSubCategory((prev) => {
                    return {
                      ...prev,
                      category: [...prev.catgory, categoryIndex],
                    };
                  });
                }}
                className="w-full outline-none p-2 bg-transparent border"
              >
                <option value="">
                  Select Category
                </option>
                {allCategory.map((category, index) => {
                  return (
                    <option value={category?._id} key={category?._id + "15643"}>
                      {category?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button
            className={`px-4 py-2 font-semibold border ${
              subCategory?.name && subCategory?.image && subCategory?.catgory
                ? "bg-primary-200 hover:bg-primary-100"
                : "bg-gray-400"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModel;
