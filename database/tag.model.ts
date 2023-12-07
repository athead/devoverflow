import mongoose, { Types, Schema, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
  description: string;
  questions: Types.ObjectId[];
  followers: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Create a schema for answers
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: [{ type: Types.ObjectId, ref: "Question" }],
    followers: [{ type: Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

// Create models for both question and answer schemas
const Tag = mongoose.model<ITag>("Tag", userSchema);

export default Tag;
