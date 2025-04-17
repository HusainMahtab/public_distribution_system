import {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnection from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs"

export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
           id:"credentials",
           name:"Creadentials",
           credentials: {
            email: { label: "Email", type: "text"},
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials:any):Promise<any>{
            await dbConnection()
            try {
                const user=await User.findOne({
                    $or:[
                        {email:credentials.identifier},
                    ]
                })
                console.log("user",user)
                if(!user){
                    throw new Error("user not found with this email")
                }
                const isPasswordCorrect=await bcrypt.compare(credentials.password,user.password)
                if(isPasswordCorrect){
                    return user
                }else{
                    throw new Error("Invalid Credentials")
                }
            } catch (error:any) {
                throw new Error(error)
            }
          }
        })
    ],
    callbacks:{
      async jwt({token,user}){
        if(user){
            token._id=user?._id?.toString()
            token.fullName=user.fullName
            token.email=user.email
            token.password=user.password
            token.role=user.role
        }
        return token
      },
      async session({session,token}){
        if(token){
            session.user._id=token?._id?.toString()
            session.user.email=token?.email
            session.user.fullName=token?.fullName
            session.user.password=token?.password
            session.user.role=token?.role
        }
        return session
      }
    },
    pages:{
        signIn:'/login'
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.JWT_SECRET_KEY
}