"use client"
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { toast } from "sonner"



export default function Page({params}:{params:{token:string}}) {
  const [alert,setalert]=useState(false)
  const pwd:any=useRef("")
  const cfpwd:any=useRef("")
  const [passwordMismatch, setPasswordMismatch] = useState("");
  const [isProcessing,setProcess]=useState(false)
  const [isLoading,setLoading]=useState(false)

  const checkToken=async () => {
    const res=await axios.post(process.env.HOST+"/user/forget/"+params.token)
    console.log(res.data)
    if(res.data.code==200){
      setLoading(true)
      setProcess(true)
    }
    else{
      setLoading(true)
      setalert(true)
    }
    
  }



  const resetpassword=async (event:any) => {
    event.preventDefault();

    if (pwd.current.value !==cfpwd.current.value) {
      setPasswordMismatch("Passwords do not match.");
      return; // 阻止表单提交
    }
    else{
      setPasswordMismatch("");
    }

    const res=await axios.post(process.env.HOST+"/user/forget/reset",{
      token:params.token,
      password:pwd.current.value
    },{
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    })
    console.log(res.data)

    if(res.data.code==200){
      setalert(true)
      toast("Success", {
        description:res.data.msg,
        action: {
          label: "OK",
          onClick: () => console.log("OK"),
        },
      })
    }
    else{
      toast("Failed", {
        description:res.data.msg,
        action: {
          label: "OK",
          onClick: () => console.log("OK"),
        },
      })

    }
    
  }

  useEffect(()=>{
    checkToken()
  },[])
  return (
    <div>
      {isLoading?
      isProcessing?<Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Reset password</CardTitle>
        <CardDescription>
          Reset your password
        </CardDescription>
      </CardHeader>
      <form onSubmit={resetpassword}>

      <CardContent>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            
            <Input
             minLength={6}
             maxLength={15}
             type='password'
             pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
             title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
             ref={pwd}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="confirmpassword">Confirm Password</Label>
            </div>
            <Input id="cfpassword" type="password" ref={cfpwd} required />
          </div>
          {passwordMismatch && <div style={{ color: 'red' }}>{passwordMismatch}</div>}

        </div>


      </CardContent>
      <CardFooter>
      <Button type="submit" className="w-full">
           Confirm
        </Button>
        
      </CardFooter>

      </form>

    </Card>:
    "" :"Loading..."}
  


  

    <AlertDialog  open={alert} >
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{isProcessing?"Success":"Alert"}</AlertDialogTitle>
        <AlertDialogDescription>
          {isProcessing?"Success reset your password":"Please Enter by your Email 's Link"}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <Link href={'/login'}><AlertDialogAction>Continue</AlertDialogAction></Link>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
    </div>
  )
}
