import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";
import { env } from "../../config/env.js";

const outputSchema = z.object({
  category: z.string(),
  priority: z.string(),
  sentiment: z.string(),
  team: z.string(),
});

export const analyzeFeedback = async (message: string) => {
  const model = new ChatGoogleGenerativeAI({
    apiKey: env.GEMINI_API_KEY,
    model: "gemini-2.5-flash-lite",
    // Optional: Add temperature for more consistent outputs
    temperature: 0.1,
  });

  const prompt = `
Return ONLY valid JSON:

{
  "category": "",
  "priority": "",
  "sentiment": "",
  "team": ""
}

Feedback: ${message}
the category should be a single word describing the feedback (e.g. "UI", "Performance", "Feature Request", "BUG").
the priority should be one of "Low", "Medium", or "High" based on the urgency and impact of the feedback.
the sentiment should be one of "Positive", "Negative", or "Neutral" based on the tone of the feedback.
the team should be a single word indicating which team should handle the feedback (e.g. "Frontend", "Backend", "QA").
`;

  const response = await model.invoke(prompt);
  const content = response.content as string;
  
  // Extract JSON from the response (handles markdown code blocks)
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || 
                    [null, content]; // If no code blocks, use full content
  
  const jsonString = jsonMatch[1] || content;
  
  // Parse and validate
  const parsed = JSON.parse(jsonString.trim());
  return outputSchema.parse(parsed);
};