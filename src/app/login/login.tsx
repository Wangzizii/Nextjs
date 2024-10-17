"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useEffect, useRef } from "react"
import { Rgwindow } from './rgwindow';
import { useRouter} from 'next/navigation'
import { toast } from "sonner"



export function LoginForm() {
  const Router=useRouter()
  var username:any=useRef(null)   
  var password:any=useRef(null)


  const log=async (event:any)=>{
    event.preventDefault();
    var account=new FormData()
    
    account.append("username",username.current.value)
    account.append("password",password.current.value)
    console.log(account)
    const r= await axios.post(process.env.HOST+"/user/login",account)
      console.log(r)
      if(r.data.code==200){
        if(r.data.data.authenticator)
        {
          
          Router.push("/auth/mfa/"+r.data.data.username)
        }
        else{
        try {
          typeof window !== "undefined" ? window.localStorage.setItem('token',r.data.data.token) : false
          
        } catch (error) {
           
          toast("Failed", {
            description:r.data.msg,
            action: {
              label: "OK",
              onClick: () => console.log("OK"),
            },
          })
          
        }
        Router.push('/auth/mfa/'+r.data.data.username)
        }

      }
      else{

        toast("Failed", {
          description:r.data.msg,
          action: {
            label: "OK",
            onClick: () => console.log("OK"),
          },
        })
          
      }
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
        <form onSubmit={log}>
          <div className="grid gap-2">
            <Label htmlFor="email">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              minLength={5}
              maxLength={16}
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
            <Input id="password" type="password"
             required  minLength={5}
              maxLength={16} ref={password} />
          </div>
          <Button className="w-full"  type="submit">
            Login
          </Button>
          </form>
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