import { Schema, model } from "mongoose";
import { IStorage } from "../interfaces/uploadFiles";

const TransactionSchema = new Schema<IStorage>({
  id: {
    type: String
  },
  status: {
    type: String
  },
  data: [{
    name: String,
    age: Number,
    value:  Number,
    invoice: String,
    date:Date,
  }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const TransactionModel = model("transaction-file", TransactionSchema);
export default TransactionModel;