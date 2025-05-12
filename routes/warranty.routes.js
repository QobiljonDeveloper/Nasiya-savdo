const express = require("express");
const router = express.Router();

const {
  getAllWarranties,
  getWarrantyById,
  createWarranty,
  updateWarranty,
  deleteWarranty,
} = require("../controllers/warranty.controller");


router.get("/", getAllWarranties);
router.post("/create", createWarranty);
router.patch("/:id", updateWarranty);
router.delete("/:id", deleteWarranty);
router.get("/:id", getWarrantyById);

module.exports = router;
