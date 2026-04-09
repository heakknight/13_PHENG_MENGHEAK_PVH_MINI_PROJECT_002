import { NextRequest, NextResponse } from "next/server";

export default function proxy(request) {
  return NextResponse.redirect(new URL('/', request.url));
}