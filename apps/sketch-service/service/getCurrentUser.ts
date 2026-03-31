import { BACKEND_URL } from "@/config";


//this is the current userId ;

export async function getCurrentUser() {
  const res = await fetch(`${BACKEND_URL}/api/v1/user/auth/api/me`, {
    credentials: "include", 
  });

  const user = await res.json();
  return user;
}