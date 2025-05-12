const express = require("express");
const router = express.Router();

const {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/payments.controller");

router.get("/", getAllPayments);
router.post("/create", createPayment);
router.patch("/:id", updatePayment);
router.delete("/:id", deletePayment);
router.get("/:id", getPaymentById);

module.exports = router;
