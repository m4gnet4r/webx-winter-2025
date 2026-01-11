const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const { getAllUsers, getAllTasks } = require("../controllers/adminController");

router.get("/users", auth, admin, getAllUsers);
router.get("/tasks", auth, admin, getAllTasks);

module.exports = router;
