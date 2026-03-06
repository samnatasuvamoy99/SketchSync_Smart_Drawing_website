
import {prisma} from "@repo/db/client"
import bcrypt from "bcryptjs";
import { userSignupSchema, userSigninSchema} from "../schema/data_validation.schema.js"


export const UsersSignupService = async (body: any) => {

const parsed = userSignupSchema.parse(body);

      console.log(parsed.username);
      

   const hashPassword = await bcrypt.hash(parsed.password, 10);

   // db operation for users......
   const user = await prisma.user.create({
      data: {
         username: parsed.username,
         email: parsed.email,
         password: hashPassword,
         photo:parsed.photoUrl
      }
   })

   return user;

}

// here we write signin logic service...
export const UserSigninService = async (body: any) => {
const parsed = userSigninSchema.safeParse(body);

   if (!parsed.success) {
      throw new Error("Invalid input provide correct....!");
   }
   const { email, password } = parsed.data;

   if (!email || !password) {
      throw new Error("USER_NOT_FOUND")
   }

   //db operation here
   const user = await prisma.user.findUnique({
      where: {
         email: parsed.data.email
      }
   })

if(!user){
    throw new Error("PLEASE provide correct email ......~!!");

}

return {
   user,
   password
}}

