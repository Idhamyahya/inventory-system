import {
  createCategories,
  getAllCategories,
  getCategoryById,
} from "../models/categoryModel.js";

export const getCategories = async () => {
  const categories = await getAllCategories();
  return categories;
};

export const createCategory_S = async (name) => {
  if (!name || !name.trim()) {
    const error = new Error("Nama category wajib diisi");
    error.statusCode = 400;

    throw error;
  }
  const category = await createCategories(name.trim());

  return category;
};

export const getCategoryById_S = async (id) => {
  const category = await getCategoryById(id);

  if (!category) {
    const error = new Error("ID tidak ditemukan");
    error.statusCode = 404;
    throw error;
  }
  return category;
};
