const express = require("express");
const router = express.Router();

const {
  getAllFeatures,
  getFeatureById,
  createFeature,
  updateFeature,
  deleteFeature,
} = require("../controllers/features.controller");

router.get("/", getAllFeatures);
router.post("/create", createFeature);
router.patch("/:id", updateFeature);
router.delete("/:id", deleteFeature);
router.get("/:id", getFeatureById);

module.exports = router;
