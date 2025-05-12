const express = require("express");
const router = express.Router();

const {
  getAllContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract,
} = require("../controllers/contracts.controller");

router.get("/", getAllContracts);
router.post("/create", createContract);
router.put("/:id", updateContract);
router.delete("/:id", deleteContract);
router.get("/:id", getContractById);

module.exports = router;
