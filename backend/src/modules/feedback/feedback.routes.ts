import { Router } from "express";
import * as controller from "./feedback.controller.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import { createFeedbackSchema } from "./feedback.validation.js";

const router = Router();

/**
 * @route   POST /api/feedback
 * @desc    Create new feedback (LLM analyzed + stored)
 * @access  Public
 */
router.post(
  "/",
  validateRequest(createFeedbackSchema),
  controller.create
);

/**
 * @route   GET /api/feedback
 * @desc    Get feedback list with filters + pagination
 * @access  Public
 */
router.get("/", controller.getAll);

/**
 * @route   GET /api/feedback/categories
 * @desc    Get all unique categories
 * @access  Public
 */
router.get("/categories", controller.getCategories);

/**
 * @route   DELETE /api/feedback/:id
 * @desc    Delete feedback by ID
 * @access  Public
 */
router.delete("/:id", controller.deleteFeedback);

export default router;