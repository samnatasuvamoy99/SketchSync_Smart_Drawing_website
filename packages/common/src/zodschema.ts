import {z} from "zod"

export const signupSchema = z.object({
  username:z.string().min(5 , "user-username must be 5 char").max(10),
  email :z.string().email("Invalid email address").max(10),
  password:z.string().min(5  ," user-password must be 5 char").max(13),
  photoUrl:z.string().url("Invalid photo URL")
});

export const signinSchema = z.object({
   email:z.string().email("Invalid email address").max(10),
   password:z.string().min( 5 , "user-password must be 5 char").max(15)
})

export const CreateRoomSchema = z.object({
    roomName: z.string().min(3).max(20),
})