import { getAllCategories } from "./categoryModel.js";

try {
  const categories = await getAllCategories();
  console.log("Categories berhasil diambil");
  console.log(categories);
} catch (error) {
  console.log("Categories gagal diambil");
  console.error(error.message);
}
