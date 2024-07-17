"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import SigninCard from '@/components/ui/signin'

import {FcGoogle} from "@react-icons/all-files/fc/FcGoogle"
import {FaFacebook} from "@react-icons/all-files/fa/FaFacebook"
import { useRouter } from "next/navigation"
import { FormEvent } from "react";
import SignupCard from "@/components/ui/signup";

export default function Auth() {



  return (
    <div className="w-[400px] mx-auto my-10">
      <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Signin</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SigninCard />
        </TabsContent>
        <TabsContent value="signup">
          <SignupCard />
        </TabsContent>
      </Tabs>

      <div >
        <div className="flex justify-center">
          <span className="text-center">Or</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex justify-between space-x-3">
            <FcGoogle />
            <span>
              Sign-in with Google
            </span>
          </Button>
          <Button className="flex justify-between space-x-3" >
            <FaFacebook size={20} />
            <span>
              Sign-in with Facebook
            </span>
          </Button>
          </div>
        </div>
    </div>


  )
}
