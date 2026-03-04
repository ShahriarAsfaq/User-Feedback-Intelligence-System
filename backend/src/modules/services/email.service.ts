// nodemailer does not ship with its own types; use @types/nodemailer if available
// @ts-ignore
import nodemailer from "nodemailer";
import { env } from "../../config/env.js";

// configure transporter using environment settings
const transporter = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: Number(env.MAIL_PORT) || 587,
  secure: env.MAIL_SECURE === "true", // true for 465, false for other ports
  auth: env.MAIL_USER
    ? {
        user: env.MAIL_USER,
        pass: env.MAIL_PASS,
      }
    : undefined,
});

// simple helper that formats the LLM output into a readable message
const formatBody = (name: string, structured: { category: string; priority: string; sentiment: string; team: string }) => {
  return `Feedback received from ${name}:

Category: ${structured.category}
Priority: ${structured.priority}
Sentiment: ${structured.sentiment}
Team: ${structured.team}`;
};

export const sendFeedbackNotification = async (
  to: string,
  name: string,
  llmData: { category: string; priority: string; sentiment: string; team: string }
) => {
  const textBody = formatBody(name, llmData);
  const info = await transporter.sendMail({
    from: env.MAIL_USER || "no-reply@example.com",
    to,
    subject: "New feedback submitted",
    text: textBody,
  });

  console.log("Email sent:", info.messageId);
  return info;
};
