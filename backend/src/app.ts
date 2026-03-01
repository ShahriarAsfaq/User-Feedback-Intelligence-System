import express from "express";
import cors from "cors";
import feedbackRoutes from "./modules/feedback/feedback.routes.js";
import { errorHandler } from "./modules/middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/feedback", feedbackRoutes);

app.use(errorHandler);

export default app;