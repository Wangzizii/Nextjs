"use client"

import React, { Suspense, useEffect, useState } from 'react'
import { Qrcodeimg } from './Qrcodeimg';
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import axios from 'axios';
import { toast } from "sonner"
import Link from 'next/link';
type CardProps = React.ComponentProps<typeof Card>


export default function Page({params}:{params:{username:string}},{ className, ...props }: CardProps) {
  const [value, setValue] = React.useState("")
  const Router=useRouter();

  const [enable,setEnable]=useState(false)

  const checkmfa= async () => {

    const res=await axios.post(process.env.HOST+"/user/checkmfa",{
      username:params.username
    },{
      headers:{
        "Content-Type":'application/x-www-form-urlencoded'
      }
    })
    console.log(params.username)
    console.log(res.data)

    setEnable(res.data.data)
    
  }

  const verify=async () => {
    const res= await axios.post(process.env.HOST+"/user/twostep",{
      username:params.username,
      code:value
    },{
      headers:{
        "Content-Type":"application/x-www-form-urlencoded"
      }
    })

    if(res.data.code==200){
      toast("Welcome", {
        description:res.data.msg,
        action: {
          label: "OK",
          onClick: () => console.log("OK"),
        },
      })
    window.localStorage.setItem("token",res.data.data)
    
    Router.push("/dashboard/settings")
  }
    else{
      toast("Failed", {
        description:res.data.msg,
        action: {
          label: "OK",
          onClick: () => console.log("OK"),
        },
      })

     
      console.log(res.data)

    

    }
    
  }
  const bind =async ()=>{
    const res= await axios.post(process.env.HOST+"/user/twostep",{
      username:params.username,
      code:value
    },{
      headers:{
        "Content-Type":"application/x-www-form-urlencoded"
      }
    })

    if(res.data.code==200){    
      toast("Welcome", {
        description:res.data.msg,
        action: {
          label: "OK",
          onClick: () => console.log("OK"),
        },
      })
    Router.push("/dashboard/settings")
  }
    else{
      toast("Failed", {
        description:res.data.msg,
        action: {
          label: "OK",
          onClick: () => console.log("OK"),
        },
      })

     
      console.log(res.data)

    

    }
    
  }

  useEffect(()=>{
    checkmfa()

  },[])
  return (

    <div className='flex flex-1 flex-col min-h-96 justify-center items-center ' >


    <Suspense fallback={'<p>Loading</p>'}>
      {enable? 
      <Card  className={cn("min-w-96   w-1/3 flex h-1/2  flex-col items-center justify-center",className) } {...props}>

      <CardHeader>
        <CardTitle>Please enter your Code in Authenticator</CardTitle>
        <CardDescription>Your account has enabled Authenticator</CardDescription>
      </CardHeader>

      <CardContent>
      
      <InputOTP maxLength={6} value={value}  onChange={(value) => {setValue(value) }} required>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator/>
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
    </CardContent>

    <CardFooter className="flex justify-between w-full">
        <Button className='w-full' onClick={verify}>Verify</Button>
      </CardFooter>
      </Card>
      

      :
      <Card className={cn("min-w-64   w-1/3 flex  flex-col items-center justify-center",className) } {...props} >
      <CardHeader>
        <CardTitle>Enable Authenticator</CardTitle>
        <CardDescription>Please scan the QRCode</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
      <Qrcodeimg username={params.username}  />

        <div className=" flex items-center   p-4">
        <InputOTP maxLength={6} value={value}  onChange={(value) => {setValue(value) }}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator/>
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
        </div>
        <div>
          
        </div>
      </CardContent>
      <CardFooter className="flex justify-between w-full">
        <Button variant="outline" ><Link href={'/dashboard/settings'}  >Not now</Link></Button>
        <Button onClick={bind}>Verify</Button>
      </CardFooter>
    </Card>}
    </Suspense>
       
      
    </div>
  )
}
