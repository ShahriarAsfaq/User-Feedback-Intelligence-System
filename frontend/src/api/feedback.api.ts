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
  const res = await api.get<Feedback[]>("/feedback", { params });
  return res.data;
};