const express = require("express");
const router = express.Router();

const {
  getAllLaptops,
  getLaptopById,
  createLaptop,
  updateLaptop,
  deleteLaptop,
} = require("../controllers/laptops.controller");

router.get("/", getAllLaptops);
router.post("/create", createLaptop);
router.patch("/:id", updateLaptop);
router.delete("/:id", deleteLaptop);
router.get("/:id", getLaptopById);

module.exports = router;
