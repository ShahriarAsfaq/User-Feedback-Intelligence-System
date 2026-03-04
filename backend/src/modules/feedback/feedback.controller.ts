import { Request, Response } from "express";
import * as service from "./feedback.service.js";

export const create = async (req: Request, res: Response) => {
  const result = await service.createFeedback(req.body);
  res.status(201).json(result);
};

export const getAll = async (req: Request, res: Response) => {
  const result = await service.getFeedbacks(req.query);
  res.json(result);
};

export const getCategories = async (req: Request, res: Response) => {
  const result = await service.getCategories();
  res.json(result);
};

export const deleteFeedback = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await service.deleteFeedback(id);
  res.json(result);
};