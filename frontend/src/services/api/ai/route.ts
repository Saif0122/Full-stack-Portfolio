
import { NextResponse } from "next/server";

// This route is now a fallback since logic is handled in services/aiService.ts
export async function GET() {
  return NextResponse.json({ 
    status: "active", 
    message: "Saiful's AI services are running via frontend SDK for maximum performance." 
  });
}

export async function POST() {
  return NextResponse.json({ 
    error: "Legacy endpoint. Please use the direct SDK implementation in services/aiService.ts." 
  }, { status: 410 });
}
