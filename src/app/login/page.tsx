"use client"
import React, { useEffect, useState } from 'react'
import { LoginForm } from './login'
import axios from 'axios'
import { useRouter } from 'next/navigation';


export default function page() {
  const Router=useRouter()
  const [isLoading,setLoading]=useState(false)


  const isLogin=async () => {
    try {
      const res=await axios.post(process.env.HOST+"/user/checklogin",{},{
        headers:{
          "Authorization": typeof window !== "undefined" ? window.localStorage.getItem('token') : false,
        }
      })
  
      if(res.data.code==200){
        setLoading(true)
        Router.push("/dashboard/settings")
  
      }
      else{
        setLoading(true)
        return
      }
      
    } catch (error) {

      setLoading(true)

      
    }
    
    
  }
  useEffect(()=>{
  
   isLogin()

  },[])
  
 
  
  return (
   <>
  <div className='w-full h-full lg:block' style={{height:'100vh'}}>

    {isLoading?<LoginForm></LoginForm>:"Loading..."}
   
   </div>
    
   </>
  )
}
