import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    priority: { type: String, enum: ["low", "medium", "high"], required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);
export default Task;
