const express = require("express");
const router = express.Router();

const {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../controllers/brands.controller");

router.get("/", getAllBrands);
router.post("/create", createBrand);
router.patch("/:id", updateBrand);
router.delete("/:id", deleteBrand);
router.get("/:id", getBrandById);

module.exports = router;
