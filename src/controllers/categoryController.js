import {
  createCategory_S,
  getCategories,
  getCategoryById_S,
} from "../service/categoryService.js";

export const getCategories_C = async (req, res, next) => {
  try {
    const categories = await getCategories();
    res.status(200).json({
      success: true,
      message: "Categories berhasil ditemukan",
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};
export const createCategory_C = async (req, res, next) => {
  try {
    const { name } = req.body;

    const category = await createCategory_S(name);

    res.status(201).json({
      success: true,
      message: "Category berhasil dibuat",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById_C = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById_S(id);
    res.status(200).json({
      success: true,
      message: "ID ditemukan",
      data: category,
    });
  } catch (error) {
    res.status(error.statusCode || 404).json({
      success: false,
      message: error.message,
    });
  }
};
