export interface SearchItemType {
  type: string;
  id: string;
  title: string;
}

export interface Tag {
  _id: string;
  name: string;
  description: string;
  questions: object[];
  followers: object[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id: string;
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
  saved: object[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Answer {
  _id: string;
  author: User;
  question: object;
  content: string;
  upvotes: object[];
  downvotes: object[];
}

export interface Question {
  _id: string;
  title: string;
  content: string;
  tags: Tag[];
  views: number;
  upvotes: object[];
  downvotes: object[];
  author: User;
  answers: Answer[];
  createdAt: Date;
  updatedAt: Date;
}
