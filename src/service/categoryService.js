import { getAllCategories } from "../models/categoryModel.js";

export const getCategories = async () => {
  const categories = getAllCategories();
  return categories;
};
