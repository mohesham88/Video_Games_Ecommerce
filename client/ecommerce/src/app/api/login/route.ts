import { NextRequest, NextResponse } from "next/server";
import axios, { HttpStatusCode } from "axios"
import { cookies } from "next/headers";


export async function POST(request: NextRequest) {
  const {email, password} = await request.json();

  try{
    const loginRes = await axios.post(
      `${process.env.SERVER_BASE_URL}/auth/signin`,
      {
        email,
        password
      }
    );
    cookies().set("accessToken", loginRes.data.accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60, // 1 week
        sameSite: "strict",
    });
    return NextResponse.json(loginRes.data, { status: 201 });
  }catch(err){
    return NextResponse.json({
      message : "Invalid Credentials",
    } , { status: HttpStatusCode.Unauthorized });

  }

}