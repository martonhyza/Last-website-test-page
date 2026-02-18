
import { GoogleGenAI, Type } from "@google/genai";
import { LeadFormData } from "../types.ts";

export const analyzeBottlenecks = async (data: LeadFormData) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Analyze the following operational bottlenecks for a fitness business/gym and provide a professional, calm, strategic 3-point insight report.
  
  Business Context:
  - Name: ${data.fullName}
  - Monthly Budget Range: ${data.budget}
  - Reported Bottlenecks: ${data.bottlenecks}
  
  Instructions:
  - Do not use hype.
  - Be intelligent and strategic.
  - Suggest how custom AI/automation (not specific software) might solve these.
  - Keep it brief (3 clear points).`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strategicInsights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Three high-level strategic observations."
            },
            recommendedFocus: {
              type: Type.STRING,
              description: "A single sentence recommending the primary area of infrastructure focus."
            }
          },
          required: ["strategicInsights", "recommendedFocus"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return null;
  }
};
