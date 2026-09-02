import { getCategories } from "../service/categoryService.js";

const categories = await getCategories();
export const getCategories_C = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Categories berhasil ditemukan",
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};
