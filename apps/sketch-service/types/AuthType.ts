// it's for signin and signup section types...

export type AuthType = "signin" | "signup";

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
}