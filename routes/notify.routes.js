const express = require("express");
const router = express.Router();

const {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
} = require("../controllers/notify.controller");

router.get("/", getAllNotifications);
router.post("/create", createNotification);
router.patch("/:id", updateNotification);
router.delete("/:id", deleteNotification);
router.get("/:id", getNotificationById);

module.exports = router;
