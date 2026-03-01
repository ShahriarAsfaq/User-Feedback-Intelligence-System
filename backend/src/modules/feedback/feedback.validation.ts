import { z } from "zod";

export const createFeedbackSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(5),
  }),
});