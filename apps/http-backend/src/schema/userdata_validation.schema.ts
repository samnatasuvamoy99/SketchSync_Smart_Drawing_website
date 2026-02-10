import {z} from "zod"

export const signupSchema = z.object({
  username:z.string().min(5 , "user-username must be 5 char"),
  email :z.string().email("Invalid email address"),
  password:z.string().min(5  ," user-password must be 5 char")
});


export const signinSchema = z.object({
   email:z.string().email("Invalid email address"),
   password:z.string().min( 5 , "user-password must be 5 char")
})