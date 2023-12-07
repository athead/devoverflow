import mongoose, { Types, Schema, Document } from "mongoose";

export interface IQuestion extends Document {
  title: string;
  content: string;
  tags: Types.ObjectId[];
  views: number;
  upvotes: Types.ObjectId[];
  downvotes: Types.ObjectId[];
  author: Types.ObjectId;
  answers: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Create a schema for answers
const questionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [{ type: Types.ObjectId, ref: "Tag" }],
    views: {
      type: Number,
      default: 0,
    },
    upvotes: [{ type: Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Types.ObjectId, ref: "User" }],
    author: { type: Types.ObjectId, ref: "User" },
    answers: [{ type: Types.ObjectId, ref: "Answer" }],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

// Create models for both question and answer schemas
const Question = mongoose.model<IQuestion>("Question", questionSchema);

export default Question;
