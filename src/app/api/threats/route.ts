import { NextResponse } from "next/server";
import { ThreatPayload } from "@/lib/schema";
import { randomUUID } from "crypto";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const mockThreats: ThreatPayload[] = Array.from({ length: limit }).map(() => ({
    id: randomUUID(),
    sourceIp: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.0.1`,
    targetIp: "10.240.102.16",
    severity: Math.random() > 0.8 ? "CRITICAL" : "MEDIUM",
    timestamp: new Date().toISOString(),
  }));

  return NextResponse.json({
    data: mockThreats,
    meta: { page, limit, totalPages: 100 }
  });
}
