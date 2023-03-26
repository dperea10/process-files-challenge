import { Schema, model } from "mongoose";
import { ITask } from "../interfaces/uploadFiles";

const StatusFileSchema = new Schema<ITask>(
  {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    errorsList: [{
      row: Number,
      col: Number,
      message: String
    }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const StatusFileModel = model("status-file", StatusFileSchema);
export default StatusFileModel;