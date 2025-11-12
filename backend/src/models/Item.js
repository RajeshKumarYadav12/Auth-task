const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      enum: ["Work", "Personal", "Shopping", "Health", "Other"],
      default: "Other",
    },
    status: {
      type: String,
      enum: ["Active", "Completed", "Pending"],
      default: "Active",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better search performance
itemSchema.index({ title: "text", description: "text" });
itemSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Item", itemSchema);
