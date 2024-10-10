"use client"
import React from 'react'
import { LoginForm } from './login'
import { Toaster } from "@/components/ui/sonner"
import axios from 'axios'
import { useRouter } from 'next/navigation';
export default function page() {
  const Router=useRouter()
  axios.post(process.env.HOST+"/user/checklogin",{},{
    headers:{
      "Authorization": typeof window !== "undefined" ? window.localStorage.getItem('token') : false,
    }
  }).then(r=>{
    const  islogin=r.data
    console.log(islogin)
    if(islogin.code==200){
      Router.push("/dashboard/settings")
    }
  })
 
  
  return (
   <>
    
   <div className='w-full h-full lg:block' style={{height:'100vh'}}>
   <LoginForm>

   </LoginForm>
   <Toaster/>
   </div>
    
   </>
  )
}
