import Feedback from "./feedback.model.js";
import { analyzeFeedback } from "../services/llm.service.js";

export const createFeedback = async (data: any) => {
  const aiData = await analyzeFeedback(data.message);
  return Feedback.create({ ...data, ...aiData });
};

export const getFeedbacks = async (query: any) => {
  const filter: any = {};

  if (query.name) filter.name = query.name;
  if (query.category) filter.category = query.category;
  if (query.priority) filter.priority = query.priority;

  return Feedback.find(filter)
    .sort({ createdAt: -1 })
    .limit(Number(query.limit) || 20)
    .skip(Number(query.page) * 10 || 0);
};