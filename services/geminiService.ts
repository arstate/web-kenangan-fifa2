
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export const getRomanticTitleSuggestion = async (story: string): Promise<string> => {
  if (!apiKey) {
      return "Beautiful Memory"; // Fallback title
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Based on the following romantic memory, suggest one short, beautiful, and poetic title (less than 6 words). Only return the title itself, with no quotation marks or extra text.
      
      Memory: "${story}"`,
      config: {
        temperature: 0.8,
      },
    });
    const title = response.text.trim().replace(/"/g, ''); // Clean up response
    return title || "A Day to Remember"; // Fallback if response is empty
  } catch (error) {
    console.error("Error generating title with Gemini:", error);
    return "A Cherished Moment"; // Return a default title on error
  }
};
