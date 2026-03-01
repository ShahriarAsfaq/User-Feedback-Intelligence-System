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