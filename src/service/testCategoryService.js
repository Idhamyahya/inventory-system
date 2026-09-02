import { getCategories } from "./categoryService.js";

try {
  const categories = await getCategories();
  console.log("service berhasil");
  console.log(categories);
} catch (error) {
  console.error("Service gagal");
  console.log(error);
}
