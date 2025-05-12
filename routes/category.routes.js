const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

router.get("/", getAllCategories);
router.post("/create", createCategory);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.get("/:id", getCategoryById);

module.exports = router;
