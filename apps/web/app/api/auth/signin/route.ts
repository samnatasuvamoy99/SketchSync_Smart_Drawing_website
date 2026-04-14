import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  console.log( email, password);

  return NextResponse.json({
    success: true,
    message: "User Signin successfully  completed...!",
  });
}