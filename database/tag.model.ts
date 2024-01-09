import mongoose, { Types, Schema, Document, models } from "mongoose";

export interface ITag extends Document {
  name: string;
  description: string;
  questions: Types.ObjectId[];
  followers: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Create a schema for answers
const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "Без описания",
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
const Tag = models.Tag || mongoose.model<ITag>("Tag", tagSchema);

export default Tag;
