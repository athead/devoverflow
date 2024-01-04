import mongoose, { Types, Schema, Document, models } from "mongoose";

export interface IInteraction extends Document {
  user: Types.ObjectId;
  action: string;
  question: Types.ObjectId;
  answer: Types.ObjectId;
  tags: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Create a schema
const interactionSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", require: true },
    action: { type: String, require: true },
    question: { type: Types.ObjectId, ref: "Question" },
    tags: [{ type: Types.ObjectId, ref: "Tag" }],
    answer: { type: Types.ObjectId, ref: "Answer" },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

// Create model
const Interaction =
  models.Interaction ||
  mongoose.model<IInteraction>("Interaction", interactionSchema);

export default Interaction;
