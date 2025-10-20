import { NextResponse } from "next/server";

export function jsonResponse(success: boolean, message: string, data?: any) {
  return NextResponse.json({ success: success, message: message, data: data });
}
