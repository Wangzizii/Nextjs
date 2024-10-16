"use client"
import React, { useEffect } from 'react'
import { LoginForm } from './login'
import axios from 'axios'
import { useRouter } from 'next/navigation';
export default function page() {
  const Router=useRouter()
  useEffect(()=>{
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
    }).catch(e=>{
  
    })

  },[])
  
 
  
  return (
   <>
  <div className='w-full h-full lg:block' style={{height:'100vh'}}>

    
   <LoginForm>

   </LoginForm>
   </div>
    
   </>
  )
}
