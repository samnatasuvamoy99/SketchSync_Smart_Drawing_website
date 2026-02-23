import {signupSchema , signinSchema ,  CreateRoomSchema } from "@repo/common/ZodTypes"

export const userSignupSchema = signupSchema;
export const userSigninSchema = signinSchema;
export const userRoomSchema   = CreateRoomSchema;