import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useRef } from "react"
import { Rgwindow } from './rgwindow';



export function LoginForm() {

  var username:any=useRef(null)   
  var password:any=useRef(null)
  
  

  const log=async ()=>{
    var account=new FormData()
    
    account.append("username",username.current.value)
    account.append("password",password.current.value)
    console.log(account)
    const r= await axios.post("http://localhost:8080/user/login",account)
      console.log(r)
}

  
 
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-full">
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your username below to login to your account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              ref={username}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>


              {/* <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link> */}


            </div>
            <Input id="password" type="password" required  ref={password} />
          </div>
          <Button className="w-full" onClick={log} type="submit">
            Login
          </Button>
          <div className="w-full"> <Rgwindow></Rgwindow></div>
          
        </div>

      </div>
    </div>
    <div className="hidden bg-muted lg:block">
      <Image
        src="/placeholder.svg"
        alt="Image"
        width="1920"
        height="1080"
        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
  )
}