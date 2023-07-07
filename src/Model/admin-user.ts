import mongoose, { Schema, Document } from "mongoose";

export interface Iuser extends Document {
  emailId: string;
  password: string;
}

const adminUserSchema: Schema = new Schema({
  emailId: String,
  password: String,
});

export default mongoose.model<Iuser>("Admin", adminUserSchema);
