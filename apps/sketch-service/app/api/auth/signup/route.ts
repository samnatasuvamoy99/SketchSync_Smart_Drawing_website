import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  console.log(username, email, password);

  return NextResponse.json({
    success: true,
    message: "User Signup successfully  completed...!",
  });
}