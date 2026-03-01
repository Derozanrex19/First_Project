import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const getFinancialInsights = async (data: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this financial data and provide a concise, professional insight summary: ${JSON.stringify(data)}`,
      config: {
        systemInstruction: "You are a senior financial advisor. Provide professional, actionable insights for a fintech dashboard.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching insights:", error);
    return "Unable to generate insights at this time.";
  }
};
