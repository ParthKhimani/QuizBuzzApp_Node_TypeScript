import mongoose, { Document, Schema, Types } from "mongoose";
import { IManager } from "./manager-user";
import { IEmployee } from "./employee-user";

export interface ITechnology extends Document {
  name: string;
  managers: mongoose.Types.ObjectId[] | Types.Array<IManager>;
  employees: mongoose.Types.ObjectId[] | Types.Array<IEmployee>;
}

const technologySchema: Schema = new Schema({
  name: String,
  managers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Manager",
    },
  ],
  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

const Technology = mongoose.model<ITechnology>("Technology", technologySchema);

export default Technology;
