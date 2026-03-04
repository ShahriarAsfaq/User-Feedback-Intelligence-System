import Feedback from "./feedback.model.js";
import { analyzeFeedback } from "../services/llm.service.js";
import { sendFeedbackNotification } from "../services/email.service.js";

export const createFeedback = async (data: any) => {
  const aiData = await analyzeFeedback(data.message);
  // send email notification asynchronously but don't block the creation
  if (data.email) {
    sendFeedbackNotification(data.email, data.name, aiData).catch((err) => {
      // log errors so they don't disrupt API response
      console.error("Failed to send feedback email", err);
    });
  }

  return Feedback.create({ ...data, ...aiData });
};

export const getFeedbacks = async (query: any) => {
  const filter: any = {};

  if (query.name) filter.name = query.name;
  if (query.category) filter.category = query.category;
  if (query.priority) {
    const p = String(query.priority).trim();
    // case-insensitive match
    filter.priority = new RegExp(`^${p}$`, "i");
  }

  // debugging output
  console.log("getFeedbacks called with query:", query);
  console.log("constructed Mongo filter:", filter);

  const results = await Feedback.find(filter)
    .sort({ createdAt: -1 })
    .limit(Number(query.limit) || 20)
    .skip(Number(query.page) * 10 || 0);

  if (results.length === 0) {
    const all = await Feedback.find().select("priority");
    console.log("no feedbacks matched filter; stored priorities:", all.map(f => f.priority));
  }

  return results;
};

export const getCategories = async () => {
  const categories = await Feedback.find().select("category").distinct("category");
  return categories.filter((c) => c && c.trim() !== "");
};

export const deleteFeedback = async (id: string) => {
  return Feedback.findByIdAndDelete(id);
};