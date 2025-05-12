const express = require("express");
const {
  getAllUsers,
  getUsersById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");
const router = express.Router();

router.post("/create", createUser);
router.get("/", getAllUsers);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUsersById);

module.exports = router;

