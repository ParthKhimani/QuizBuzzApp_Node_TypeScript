import mongoose, { Document, Schema, Types } from "mongoose";
import { IManager } from "./manager-user";

export interface ITechnology extends Document {
  name: string;
  managers: mongoose.Types.ObjectId[] | Types.Array<IManager>;
}

const technologySchema: Schema = new Schema({
  name: String,
  managers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Manager",
    },
  ],
});

const Technology = mongoose.model<ITechnology>("Technology", technologySchema);

export default Technology;
