import mongoose from "mongoose";
import { ITask } from "../../types";

const taskCollection = "task";

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model<ITask>(taskCollection, taskSchema);

export default TaskModel;
