import "next-auth";
import type { DefaultSession } from "next-auth";

declare module 'next-auth'{
     interface User{
        _id?: string;
        fullName: string;
        email?: string;
        password?:string;
        role?: string;
       
     }
}

declare module "next-auth" {
    interface Session {
      user: {
        _id?: string;
        fullName?: string;
        email?: string;
        password?:string;
        role?: string;
      } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
        fullName?: string;
        email?: string;
        password?:string;
        role?: string;
  }
}