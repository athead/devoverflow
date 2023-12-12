import mongoose, { Types, Schema, Document, models } from "mongoose";

export interface IAnswer extends Document {
  author: Types.ObjectId;
  question: Types.ObjectId;
  content: string;
  upvotes: Types.ObjectId[];
  downvotes: Types.ObjectId[];
}

// Create a schema for answers
const answerSchema = new Schema(
  {
    author: { type: Types.ObjectId, ref: "User", require: true },
    question: { type: Types.ObjectId, ref: "Question", require: true },
    content: { type: String, require: true },
    upvotes: [{ type: Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

// Create models for both question and answer schemas
const Answer = models.Answer || mongoose.model<IAnswer>("Answer", answerSchema);

export default Answer;
