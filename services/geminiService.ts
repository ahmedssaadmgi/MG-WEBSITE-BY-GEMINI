import { GoogleGenAI, Type } from "@google/genai";
import { MonsterStyle } from "../types";

// Helper to safely get key
const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {}
  return undefined;
};

export const generateMonsterImage = async (
  prompt: string, 
  style: MonsterStyle
): Promise<string> => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-init' });
  
  if (!apiKey) {
    console.warn("API Key is missing. AI features will fail.");
  }

  const fullPrompt = `Create a high-fidelity, professional UI/UX or Technical visualization for a software project.
  Project Context: ${prompt}.
  Visual Style: ${style}.
  Aesthetic: Clean, modern, enterprise-grade, silicon valley standard.
  Details: If UI, show clear layouts and data. If Architecture, show clean lines and cloud icons.
  Lighting: Even, bright, professional presentation.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: fullPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "1K"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("No image data found in response");
  } catch (error: any) {
    console.error("Gemini Image Generation Error:", error);
    throw new Error(error.message || "Failed to generate visualization");
  }
};

export const generateArchAdvice = async (projectIdea: string) => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-init' });

  const prompt = `You are a Senior Solutions Architect at a top consultancy. 
  Analyze this project idea: "${projectIdea}".
  
  Return a JSON object with the following structure:
  {
    "stack": {
      "frontend": "string",
      "backend": "string",
      "database": "string",
      "infrastructure": "string"
    },
    "analysis": {
      "complexity": "Low" | "Medium" | "High" | "Enterprise",
      "estimatedDuration": "string (e.g. 3-4 months)",
      "keyChallenge": "string"
    },
    "brief": "A 2 sentence executive summary of the technical approach."
  }`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No advice generated");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Arch Advice Error:", error);
    throw error;
  }
};