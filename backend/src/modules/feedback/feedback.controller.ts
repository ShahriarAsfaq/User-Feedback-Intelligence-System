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