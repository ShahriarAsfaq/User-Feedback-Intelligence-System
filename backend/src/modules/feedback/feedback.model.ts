import mongoose from "mongoose";

export interface IFeedback extends mongoose.Document {
  name: string;
  email: string;
  message: string;
  category: string;
  priority: string;
  sentiment: string;
  team: string;
}

const schema = new mongoose.Schema<IFeedback>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    category: String,
    priority: String,
    sentiment: String,
    team: String,
  },
  { timestamps: true }
);

export default mongoose.model<IFeedback>("Feedback", schema);