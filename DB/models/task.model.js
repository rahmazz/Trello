import { Schema, Types, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["toDo", "doing", "done"],
      default: "toDo",
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignTo: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    deadline: {
      type: String,
      required:true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    attachment:{
      public_id:String,
      secure_url:String
    }
  },
  {
    timestamps: true,
  }
);

const taskModel = model("Task", taskSchema);

export default taskModel;
