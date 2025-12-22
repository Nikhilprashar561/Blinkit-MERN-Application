import { categoryModels } from "../models/category.models.js";
import { subCategotyModels } from "../models/subCategory.models.js";
import { productModels } from "../models/product.models.js";

const AddCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      return res.status(400).json({
        message: "Enter required Fields",
        error: true,
        success: false,
      });
    }
    const addCategory = new categoryModels({
      name,
      image,
    });

    const saveCategory = await addCategory.save();

    if (!saveCategory) {
      return res.status(400).json({
        message: "Not Created",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Add Category",
      data: saveCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Get Category Details

const getCategoryController = async (req, res) => {
  try {
    const data = await categoryModels.find();

    return res.status(200).json({
      data: data,
      message: "Data Get SuccessFully",
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

const updateCategoryController = async (req, res) => {
  try {
    const { id, name, image } = req.body;

    const update = await categoryModels.updateOne(
      {
        _id: id,
      },
      {
        name,
        image,
      }
    );
    return res.status(200).json({
      data: data,
      message: "CateGory Update SuccessFully",
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

const deleteCateGoryController = async (req, res) => {
  try {
    const { _id } = req.body;
    const checkSubCategory = await subCategotyModels
      .find({
        category: {
          $in: [_id],
        },
      })
      .countDocuments();

    const checkProductCategory = await productModels
      .find({
        category: {
          $in: [_id],
        },
      })
      .countDocuments();

    if (checkSubCategory > 0 || checkProductCategory > 0) {
      return res.status(400).json({
        message: "You Already Use This Product",
        error: true,
        success: false,
      });
    }

    const deleteCateGory = await categoryModels.deleteOne({ _id: _id });

    return res.status(400).json({
      message: "Product Delete Success Fully",
      error: false,
      success: true,
      data: deleteCateGory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export {
  AddCategoryController,
  getCategoryController,
  updateCategoryController,
  deleteCateGoryController,
};
