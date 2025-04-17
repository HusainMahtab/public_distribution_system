"use client"
import React from 'react'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

function Nav() {
    const { data: currentuser } = useSession();
    const router = useRouter();
    const { data: currentUser } = useSession();
    const role = currentUser?.user.role;
    
    const handleLogout = async () => {
        try {
          await signOut({ redirect: false, callbackUrl: "/login" });
          router.replace("/")
        } catch (error) {
          toast.error("Failed to logout");
        }
    };

    return (
      <>
       <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href={"/"} className="text-2xl font-bold text-indigo-600">
              धनौरी-राशन
            </Link>
            <div className="flex space-x-8">
              {currentuser ? (
                <div>
                  <Button onClick={handleLogout} className="bg-red-500">Logout</Button>
                </div>
              ) : ( 
                <Link href={"/login"} className="p-2 bg-gray-700 text-white font-semibold rounded-lg">
                  Login
                </Link>
              )}
            </div>
        </nav>
        <div className="p-6 md:p-1 text-center">
        {role === "admin" && (
          <Link
            href={"/admin-panel"}
            className="bg-blue-400 px-4 py-2 rounded-lg text-white text-lg"
          >
            Admin Panel
          </Link>
        )}
      </div>
      </>
       
    )
}

export default Nav