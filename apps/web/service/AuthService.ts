import { SignupRequest, SigninRequest, AuthResponse } from "@/types/AuthType";
import {BACKEND_URL} from "../config"


export async function signup(data: SignupRequest): Promise<AuthResponse> {
  const res = await fetch(`${BACKEND_URL}/api/v1/user/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}


export async function signin(data: SigninRequest): Promise<AuthResponse> {
  const res = await fetch(`${BACKEND_URL}/api/v1/user/auth/signin`, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    credentials:"include",
    body: JSON.stringify(data),
  });

  // return res;
   const result = await res.json();

    if (!res.ok) {
    throw new Error(result.message || "Signin failed");
  }

  

  return result;
}