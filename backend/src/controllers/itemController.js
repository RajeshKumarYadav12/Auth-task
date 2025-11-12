const Item = require("../models/Item");

const getItems = async (req, res) => {
  try {
    const {
      search,
      category,
      status,
      priority,
      page = 1,
      limit = 10,
    } = req.query;

    // Build query
    let query = {};

    // Regular users only see their own items, admins see all
    if (req.user.role !== "Admin") {
      query.user = req.user._id;
    }

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Category filter
    if (category && category !== "All") {
      query.category = category;
    }

    // Status filter
    if (status && status !== "All") {
      query.status = status;
    }

    // Priority filter
    if (priority && priority !== "All") {
      query.priority = priority;
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const items = await Item.find(query)
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .skip(skip);

    const total = await Item.countDocuments(query);

    res.json({
      items,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum),
      totalItems: total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "user",
      "name email role"
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if user owns this item or is admin
    if (
      item.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "Admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this item" });
    }

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { title, description, category, status, priority } = req.body;

    // Validation
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Please provide title and description" });
    }

    const item = await Item.create({
      title,
      description,
      category: category || "Other",
      status: status || "Active",
      priority: priority || "Medium",
      user: req.user._id,
    });

    const populatedItem = await Item.findById(item._id).populate(
      "user",
      "name email role"
    );

    res.status(201).json(populatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if user owns this item or is admin
    if (
      item.user.toString() !== req.user._id.toString() &&
      req.user.role !== "Admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this item" });
    }

    item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("user", "name email role");

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if user owns this item or is admin
    if (
      item.user.toString() !== req.user._id.toString() &&
      req.user.role !== "Admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this item" });
    }

    await item.deleteOne();

    res.json({ message: "Item removed", id: req.params.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const query = req.user.role === "Admin" ? {} : { user: req.user._id };

    const total = await Item.countDocuments(query);
    const active = await Item.countDocuments({ ...query, status: "Active" });
    const completed = await Item.countDocuments({
      ...query,
      status: "Completed",
    });
    const pending = await Item.countDocuments({ ...query, status: "Pending" });

    const byCategory = await Item.aggregate([
      { $match: query },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    const byPriority = await Item.aggregate([
      { $match: query },
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    res.json({
      total,
      byStatus: { active, completed, pending },
      byCategory,
      byPriority,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getStats,
};
