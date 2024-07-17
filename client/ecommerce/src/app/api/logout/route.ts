import { cookies } from "next/headers";
import { NextResponse , NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  cookies().delete("accessToken"); // delete the access token
  return NextResponse.json({ status: 201 });
}