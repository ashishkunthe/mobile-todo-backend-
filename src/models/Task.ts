import mongoose, { Document } from "mongoose";
export interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  dueDate?: Date;
  deadline?: Date;
  priority?: "low" | "med" | "high" | "urgent";
  completed: boolean;
  tags?: string[];
  createdAt: Date;
}
const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    deadline: Date,
    priority: {
      type: String,
      enum: ["low", "med", "high", "urgent"],
      default: "med",
    },
    completed: { type: Boolean, default: false },
    tags: [String],
  },
  { timestamps: true }
);
export default mongoose.model<ITask>("Task", TaskSchema);
