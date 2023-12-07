import mongoose, { Types, Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  avatar: string;
  location?: string;
  portfolioWersite?: string;
  reputation?: number;
  saved: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Create a schema for answers
const userSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false, // Assuming this might not be present during user creation
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    portfolioWebsite: {
      type: String,
    },
    reputation: {
      type: Number,
      default: 0,
    },
    saved: [{ type: Types.ObjectId, ref: "Question" }], // Assuming it references questions
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

// Create models for both question and answer schemas
const User = models.User || mongoose.model<IUser>("User", userSchema);

export default User;
