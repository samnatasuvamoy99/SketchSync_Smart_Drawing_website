import {signupSchema , signinSchema ,  CreateRoomSchema , ChatRooms_Id} from "@repo/common/ZodTypes"

export const userSignupSchema = signupSchema;
export const userSigninSchema = signinSchema;
export const userRoomSchema   = CreateRoomSchema;
export const ChatRoomId     = ChatRooms_Id;