const express = require("express");
const router = express.Router();
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getStats,
} = require("../controllers/itemController");
const { protect } = require("../middleware/authMiddleware");

// All routes are protected
router.use(protect);

// Stats route must come before :id route
router.get("/stats", getStats);

router.route("/").get(getItems).post(createItem);

router.route("/:id").get(getItem).put(updateItem).delete(deleteItem);

module.exports = router;
