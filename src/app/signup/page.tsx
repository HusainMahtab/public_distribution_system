"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import axios, { AxiosError } from "axios"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signupSchema } from "@/schemas/signup-schema"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignUp() {
  const [isSubmitting,setIsSubmitting]=useState(false)
  const form=useForm<z.infer<typeof signupSchema>>({
    resolver:zodResolver(signupSchema),
    defaultValues:{
      fullName:"",
      email:"",
      password:"",
      role:"user",
    }
  })
  const router=useRouter()
  const onSubmit=async(data:z.infer<typeof signupSchema>)=>{
    setIsSubmitting(true)
     try {
      const response=await axios.post('/api/auth/signup',data)
      console.log("response",response)
      toast.success("Success",{
        description:response.data?.message
      })
      router.replace(`/login`)
     } catch (error) {
      setIsSubmitting(false)
      console.error("Error during signup",error)
      const axiosError=error as AxiosError<any>
      toast.error("Error",{
        description:axiosError.response?.data.message || "Error during signup",
      })
    
     }
  }

  return (
    <div className="w-full flex justify-center mt-10 px-2">
     <div className="w-full md:w-[400px] border border-slate-300 rounded-md p-4 h-fit">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="fullname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          isSubmitting ? (
            <Button type="submit" className="font-serif bg-slate-600 animate-pulse" disabled>Registering...</Button>
          ) : (
            <Button type="submit" className="font-serif">SignUp</Button>
          )
        }
        
      </form>
      <div className="w-full flex mt-6 justify-center gap-4">
        <p>Already have account ? </p>
        <Link href={"/login"} className="font-semibold hover:underline font-serif">SignIn</Link>
      </div>
    </Form>
      </div>
    </div>
    
  )
}

