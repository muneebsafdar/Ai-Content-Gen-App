import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});

interface RequestBody {
  prompt: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: "Prompt is required" },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return NextResponse.json(
        { success: false, error: "API key not configured" },
        { status: 500 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    console.log("GenAI Response:", response);
    
    // Extract the text from the response
    const text = response.text || 
                response.candidates?.[0]?.content?.parts?.[0]?.text || 
                "No response generated";

    return NextResponse.json(
      { success: true, text },
      { status: 200 }
    );
    
  } catch (error: any) {
    console.error("GenAI API error:", error);
    
    // Handle specific Google AI API errors
    if (error.status === 429) {
      return NextResponse.json(
        { 
          success: false, 
          error: "API quota exceeded. Please try again in a few moments.",
          details: "You've exceeded the free tier limits for Gemini API."
        },
        { status: 429 }
      );
    }
    
    if (error.status === 401) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid API key. Please check your Google AI Studio API key."
        },
        { status: 401 }
      );
    }
    
    if (error.status === 403) {
      return NextResponse.json(
        { 
          success: false, 
          error: "API access forbidden. Please check your API key permissions."
        },
        { status: 403 }
      );
    }

    // Generic error response
    const errorMessage = error.message || "Unknown error occurred";
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to generate response",
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}