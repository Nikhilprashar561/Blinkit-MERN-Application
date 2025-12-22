import { subCategotyModels } from "../models/subCategory.models.js";

const AddSubCategoryController = async (req, res) => {
  try {
    const { name, image, category } = req.body;
    if (!name || !image || !category) {
      return res.status(500).json({
        message: "All Fields are required ",
        error: true,
        success: false,
      });
    }
    const payload = {
      name,
      image,
      category,
    };
    const createSubCategory = new subCategotyModels(payload);
    const save = await createSubCategory.save();

    return res.status(500).json({
      message: "Sub CateGory Add Success Fully",
      data: save,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
// Get Request

const getSubCategoryController = async (req, res) => {
  try {
    const data = await subCategotyModels
      .find()
      .sort({ createdAt: -1 })
      .populate("category");
    return res.status(200).json({
      message: "Get SubCateGory Data Success Fully",
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const updateSubCategoryController = async (request, response) => {
  try {
    const { _id, name, image, category } = request.body;

    const checkSub = await subCategotyModels.findById(_id);

    if (!checkSub) {
      return response.status(400).json({
        message: "Check your _id",
        error: true,
        success: false,
      });
    }

    const updateSubCategory = await subCategotyModels.findByIdAndUpdate(_id, {
      name,
      image,
      category,
    });

    return response.json({
      message: "Updated Successfully",
      data: updateSubCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const deleteSubCategoryController = async (request, response) => {
  try {
    const { _id } = request.body;
    console.log("Id", _id);
    const deleteSub = await subCategotyModels.findByIdAndDelete(_id);

    return response.json({
      message: "Delete successfully",
      data: deleteSub,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export {
  AddSubCategoryController,
  getSubCategoryController,
  deleteSubCategoryController,
  updateSubCategoryController,
};
