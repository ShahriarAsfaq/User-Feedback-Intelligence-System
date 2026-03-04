import axios from "axios";
import type { Feedback } from "../types/feedback.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const createFeedback = async (data: {
  name: string;
  email: string;
  message: string;
}) => {
  const res = await api.post<Feedback>("/feedback", data);
  return res.data;
};

export const getFeedbacks = async (params: any) => {
  console.log("API call getFeedbacks with params:", params);
  const res = await api.get<Feedback[]>("/feedback", { params });
  console.log("API response priorities:", res.data.map((f) => f.priority));
  console.log("API :", res.data);
  return res.data;
};

export const getCategories = async () => {
  const res = await api.get<string[]>("/feedback/categories");
  return res.data;
};

export const deleteFeedback = async (id: string) => {
  const res = await api.delete(`/feedback/${id}`);
  return res.data;
};