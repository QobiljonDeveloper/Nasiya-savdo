const express = require("express");
const router = express.Router();

const {
  getAllLaptopSpecifications,
  getLaptopSpecificationById,
  createLaptopSpecification,
  updateLaptopSpecification,
  deleteLaptopSpecification,
} = require("../controllers/laptopSpecifications.controller");

router.get("/", getAllLaptopSpecifications);
router.post("/create", createLaptopSpecification);
router.put("/:id", updateLaptopSpecification);
router.delete("/:id", deleteLaptopSpecification);
router.get("/:id", getLaptopSpecificationById);

module.exports = router;
