"use client"

import * as React from "react"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { FormEvent } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { SelectGroup, SelectLabel } from "@radix-ui/react-select"
import { PasswordInput } from "./password_input"
export default function SignupCard() {
  const router = useRouter();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error , setError] = React.useState('');
  const [gender , setGender] = React.useState('male');
  const [username , setUsername] = React.useState('');
  
  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    console.log(formData)
    /* const email = formData.get('email')
    const password = formData.get('password') */
    console.log(`${email} ${password}`)

    try{
      const response = await fetch('api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      console.log(response)
      if (response.ok) {
        router.push('/')
      }else{
        // handle errors
        setError("Invalid email or password")
      }
    }catch(err){
      setError("Failed to login try again later");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Card /* className="w-[350px]" */>
        <CardHeader>
          <CardTitle>Don't have an Account Yet!</CardTitle>
          <CardDescription>Create a free account Now!!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Your Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="grid w-full items-center gap-4">
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                {/* <Input id="password" placeholder="Your Password" type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                /> */}
                
              </div>

              <div className="grid w-full items-center gap-4">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Your public username" type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
              </div>

              <div className="w-full flex justify-between items-center">
                <span>Gender: </span>
                <Select defaultValue= {gender} onValueChange={(e) => setGender(e)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue  />
                  </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
              </div>

              

            </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-center space-y-3">
          <Button className="px-8" type="submit">Signup</Button>
          
          {error && <Alert variant="destructive" className="">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>}
        </CardFooter>
      </Card>
    </form>


      


  )
}